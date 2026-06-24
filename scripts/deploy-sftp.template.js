const fs = require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline');
const SftpClient = require('ssh2-sftp-client');

const EXIT_CODES = {
  SUCCESS: 0,
  ARGUMENTS: 64,
  SFTP_FAILURE: 70,
  BACKUP_FAILURE: 71,
  UPLOAD_FAILURE: 72,
  VALIDATION_FAILURE: 73
};

function toPosixPath(inputPath) {
  return inputPath.replace(/\\/g, '/');
}

function parseArgs(argv) {
  const args = {
    port: 22,
    dryRun: false,
    localDir: path.join(process.cwd(), 'public', 'dist')
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      continue;
    }

    const key = token.slice(2);
    if (key === 'dry-run') {
      args.dryRun = true;
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }

    if (key === 'port') {
      const parsedPort = Number.parseInt(value, 10);
      if (Number.isNaN(parsedPort) || parsedPort <= 0) {
        throw new Error('Port must be a positive integer.');
      }
      args.port = parsedPort;
      i += 1;
      continue;
    }

    if (key === 'host') {
      args.host = value;
      i += 1;
      continue;
    }

    if (key === 'username') {
      args.username = value;
      i += 1;
      continue;
    }

    if (key === 'remote-dir') {
      args.remoteDir = toPosixPath(value);
      i += 1;
      continue;
    }

    if (key === 'backup-dir') {
      args.backupDir = toPosixPath(value);
      i += 1;
      continue;
    }

    if (key === 'local-dir') {
      args.localDir = path.resolve(value);
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  if (!args.host || !args.username || !args.remoteDir) {
    throw new Error('Required arguments: --host <host> --username <username> --remote-dir <remoteDir>');
  }

  if (!args.backupDir) {
    args.backupDir = `${args.remoteDir.replace(/\/+$/, '')}-backup`;
  }

  return args;
}

function promptHidden(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });

    rl.question(question, value => {
      rl.close();
      process.stdout.write('\n');
      resolve(value);
    });

    rl._writeToOutput = function writeMutedToOutput(output) {
      if (rl.stdoutMuted) {
        rl.output.write('*');
      } else {
        rl.output.write(output);
      }
    };

    rl.stdoutMuted = true;
  });
}

async function listLocalFiles(localRoot) {
  const results = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
      } else {
        results.push(absolutePath);
      }
    }
  }

  await walk(localRoot);
  return results;
}

async function ensureRemoteDirectory(sftp, remotePath, dryRun, logger) {
  const exists = await sftp.exists(remotePath);
  if (exists === 'd') {
    return;
  }

  if (dryRun) {
    logger(`[dry-run] Remote directory missing: ${remotePath}`);
    throw new Error(`Remote directory does not exist: ${remotePath}`);
  }

  await sftp.mkdir(remotePath, true);
}

async function runSftpDeployment(options, deps = {}) {
  const logger = deps.logger ?? console.log;
  const errorLogger = deps.errorLogger ?? console.error;
  const createSftpClient = deps.createSftpClient ?? (() => new SftpClient());
  const promptPassword = deps.promptPassword ?? promptHidden;

  const localExists = await fs.stat(options.localDir).then(stat => stat.isDirectory()).catch(() => false);
  if (!localExists) {
    errorLogger(`Local build directory does not exist: ${options.localDir}`);
    return EXIT_CODES.VALIDATION_FAILURE;
  }

  const password = await promptPassword('SFTP password: ');
  const sftp = createSftpClient();

  try {
    await sftp.connect({
      host: options.host,
      port: options.port,
      username: options.username,
      password
    });
  } catch (error) {
    errorLogger(`SFTP connection failed: ${error.message}`);
    return EXIT_CODES.SFTP_FAILURE;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const remoteDir = options.remoteDir.replace(/\/+$/, '');
  const backupRoot = options.backupDir.replace(/\/+$/, '');
  const backupTarget = `${backupRoot}/${timestamp}`;

  try {
    await ensureRemoteDirectory(sftp, remoteDir, options.dryRun, logger);
    await ensureRemoteDirectory(sftp, backupRoot, options.dryRun, logger);

    const currentEntries = await sftp.list(remoteDir);
    const entriesToMove = currentEntries.filter(entry => entry.name !== '.' && entry.name !== '..');

    if (entriesToMove.length > 0) {
      logger(`Preparing backup folder: ${backupTarget}`);
      if (!options.dryRun) {
        await sftp.mkdir(backupTarget, true);
      }

      for (const entry of entriesToMove) {
        const fromPath = `${remoteDir}/${entry.name}`;
        const toPath = `${backupTarget}/${entry.name}`;

        if (options.dryRun) {
          logger(`[dry-run] Move ${fromPath} -> ${toPath}`);
          continue;
        }

        try {
          await sftp.rename(fromPath, toPath);
        } catch (error) {
          errorLogger(`Backup rotation failed while moving ${fromPath}: ${error.message}`);
          return EXIT_CODES.BACKUP_FAILURE;
        }
      }
    }

    const localFiles = await listLocalFiles(options.localDir);
    if (localFiles.length === 0) {
      logger('No files found in local build directory. Nothing to upload.');
      return EXIT_CODES.SUCCESS;
    }

    for (const localFile of localFiles) {
      const relativeFilePath = toPosixPath(path.relative(options.localDir, localFile));
      const remoteFilePath = `${remoteDir}/${relativeFilePath}`;
      const remoteParent = path.posix.dirname(remoteFilePath);

      if (options.dryRun) {
        logger(`[dry-run] Upload ${localFile} -> ${remoteFilePath}`);
        continue;
      }

      try {
        await sftp.mkdir(remoteParent, true);
        await sftp.fastPut(localFile, remoteFilePath);
      } catch (error) {
        errorLogger(`Upload failed for ${relativeFilePath}: ${error.message}`);
        return EXIT_CODES.UPLOAD_FAILURE;
      }
    }

    logger(options.dryRun ? 'Dry-run completed. No remote files were modified.' : 'Deployment completed successfully.');
    return EXIT_CODES.SUCCESS;
  } finally {
    await sftp.end().catch(() => {});
  }
}

async function main() {
  try {
    console.log('Starting SFTP deployment with arguments:', process.argv.slice(2).join(' '));
    const args = parseArgs(process.argv.slice(2));
    const code = await runSftpDeployment(args);
    process.exit(code);
  } catch (error) {
    console.error(error.message);
    process.exit(EXIT_CODES.ARGUMENTS);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  EXIT_CODES,
  parseArgs,
  runSftpDeployment
};
