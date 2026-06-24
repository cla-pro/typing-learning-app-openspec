const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const { runReleasePipeline, EXIT_CODES: PIPELINE_CODES } = require('../../scripts/build-deploy');
const { runSftpDeployment, EXIT_CODES: DEPLOY_CODES } = require('../../scripts/deploy-sftp.template');

async function createLocalBuildDir() {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'release-pipeline-'));
  const localDir = path.join(tempRoot, 'public', 'dist');
  await fs.mkdir(path.join(localDir, 'nested'), { recursive: true });
  await fs.writeFile(path.join(localDir, 'index.html'), '<html></html>', 'utf8');
  await fs.writeFile(path.join(localDir, 'nested', 'main.js'), 'console.log("ok")', 'utf8');
  return { tempRoot, localDir };
}

describe('Release pipeline requirements', () => {
  test('runs release steps in strict order and succeeds when all phases pass', async () => {
    const calls = [];

    const code = await runReleasePipeline(['--dry-run'], {
      rootDir: '/repo',
      cleanPublicDirectory: async () => calls.push('cleanup'),
      runProcess: (_command, args) => {
        calls.push(`run:${args.join(' ')}`);
        return 0;
      },
      assertProductionSafety: async () => calls.push('guard'),
      generateDeployScript: async () => {
        calls.push('generate');
        return '/repo/scripts/deploy-sftp.generated.js';
      },
      log: () => {},
      errorLog: () => {}
    });

    expect(code).toBe(PIPELINE_CODES.SUCCESS);
    expect(calls).toEqual([
      'cleanup',
      'run:test',
      'guard',
      'run:run build:angular',
      'generate',
      'run:/repo/scripts/deploy-sftp.generated.js --dry-run'
    ]);
  });

  test('stops pipeline immediately when tests fail', async () => {
    const calls = [];

    const code = await runReleasePipeline([], {
      rootDir: '/repo',
      cleanPublicDirectory: async () => calls.push('cleanup'),
      runProcess: (_command, args) => {
        calls.push(`run:${args.join(' ')}`);
        return args[0] === 'test' ? 1 : 0;
      },
      assertProductionSafety: async () => calls.push('guard'),
      generateDeployScript: async () => {
        calls.push('generate');
        return '/repo/scripts/deploy-sftp.generated.js';
      },
      log: () => {},
      errorLog: () => {}
    });

    expect(code).toBe(PIPELINE_CODES.TESTS_FAILED);
    expect(calls).toEqual(['cleanup', 'run:test']);
  });

  test('fails before build when production safety guard finds violations', async () => {
    const calls = [];

    const code = await runReleasePipeline([], {
      rootDir: '/repo',
      cleanPublicDirectory: async () => calls.push('cleanup'),
      runProcess: (_command, args) => {
        calls.push(`run:${args.join(' ')}`);
        return 0;
      },
      assertProductionSafety: async () => {
        calls.push('guard');
        throw new Error('debugGrid violation');
      },
      generateDeployScript: async () => {
        calls.push('generate');
        return '/repo/scripts/deploy-sftp.generated.js';
      },
      log: () => {},
      errorLog: () => {}
    });

    expect(code).toBe(PIPELINE_CODES.PRODUCTION_GUARD_FAILED);
    expect(calls).toEqual(['cleanup', 'run:test', 'guard']);
  });
});

describe('SFTP deployment requirements', () => {
  test('aborts deployment when SFTP connection fails', async () => {
    const { localDir, tempRoot } = await createLocalBuildDir();
    const sftp = {
      connect: vi.fn(async () => {
        throw new Error('handshake failed');
      }),
      end: vi.fn(async () => {}),
      exists: vi.fn(async () => 'd'),
      list: vi.fn(async () => [])
    };

    const code = await runSftpDeployment(
      {
        host: 'example.com',
        username: 'deployer',
        remoteDir: '/var/www/app',
        backupDir: '/var/www/app-backup',
        port: 22,
        dryRun: false,
        localDir
      },
      {
        createSftpClient: () => sftp,
        promptPassword: vi.fn(async () => 'secret'),
        logger: () => {},
        errorLogger: () => {}
      }
    );

    expect(code).toBe(DEPLOY_CODES.SFTP_FAILURE);
    expect(sftp.connect).toHaveBeenCalledTimes(1);
    expect(sftp.exists).not.toHaveBeenCalled();

    await fs.rm(tempRoot, { recursive: true, force: true });
  });

  test('prompts for password, performs backup rotation, then uploads artifacts', async () => {
    const { localDir, tempRoot } = await createLocalBuildDir();
    const callOrder = [];
    const promptPassword = vi.fn(async () => 'secret');
    const sftp = {
      connect: vi.fn(async () => {
        callOrder.push('connect');
      }),
      end: vi.fn(async () => {}),
      exists: vi.fn(async () => 'd'),
      list: vi.fn(async () => [{ name: 'index.html' }, { name: 'assets' }]),
      mkdir: vi.fn(async target => {
        callOrder.push(`mkdir:${target}`);
      }),
      rename: vi.fn(async (fromPath, toPath) => {
        callOrder.push(`rename:${fromPath}->${toPath}`);
      }),
      fastPut: vi.fn(async (_localPath, remotePath) => {
        callOrder.push(`upload:${remotePath}`);
      })
    };

    const code = await runSftpDeployment(
      {
        host: 'example.com',
        username: 'deployer',
        remoteDir: '/var/www/app',
        backupDir: '/var/www/app-backup',
        port: 22,
        dryRun: false,
        localDir
      },
      {
        createSftpClient: () => sftp,
        promptPassword,
        logger: () => {},
        errorLogger: () => {}
      }
    );

    expect(code).toBe(DEPLOY_CODES.SUCCESS);
    expect(promptPassword).toHaveBeenCalledTimes(1);
    expect(sftp.rename).toHaveBeenCalled();
    expect(sftp.fastPut).toHaveBeenCalled();

    const firstRenameIndex = callOrder.findIndex(item => item.startsWith('rename:'));
    const firstUploadIndex = callOrder.findIndex(item => item.startsWith('upload:'));
    expect(firstRenameIndex).toBeGreaterThan(-1);
    expect(firstUploadIndex).toBeGreaterThan(firstRenameIndex);

    await fs.rm(tempRoot, { recursive: true, force: true });
  });

  test('dry-run validates and reports actions without remote mutations', async () => {
    const { localDir, tempRoot } = await createLocalBuildDir();
    const logMessages = [];
    const sftp = {
      connect: vi.fn(async () => {}),
      end: vi.fn(async () => {}),
      exists: vi.fn(async () => 'd'),
      list: vi.fn(async () => [{ name: 'index.html' }]),
      mkdir: vi.fn(async () => {}),
      rename: vi.fn(async () => {}),
      fastPut: vi.fn(async () => {})
    };

    const code = await runSftpDeployment(
      {
        host: 'example.com',
        username: 'deployer',
        remoteDir: '/var/www/app',
        backupDir: '/var/www/app-backup',
        port: 22,
        dryRun: true,
        localDir
      },
      {
        createSftpClient: () => sftp,
        promptPassword: vi.fn(async () => 'secret'),
        logger: message => logMessages.push(message),
        errorLogger: () => {}
      }
    );

    expect(code).toBe(DEPLOY_CODES.SUCCESS);
    expect(sftp.mkdir).not.toHaveBeenCalled();
    expect(sftp.rename).not.toHaveBeenCalled();
    expect(sftp.fastPut).not.toHaveBeenCalled();
    expect(logMessages.some(message => message.includes('[dry-run]'))).toBe(true);

    await fs.rm(tempRoot, { recursive: true, force: true });
  });
});
