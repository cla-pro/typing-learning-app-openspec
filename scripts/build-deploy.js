#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { assertProductionSafety } = require('./release-core');
const { generateDeployScript } = require('./generate-deploy-script');

const EXIT_CODES = {
  SUCCESS: 0,
  CLEANUP_FAILED: 10,
  TESTS_FAILED: 20,
  PRODUCTION_GUARD_FAILED: 30,
  BUILD_FAILED: 40,
  GENERATE_DEPLOY_SCRIPT_FAILED: 50,
  DEPLOY_FAILED: 60
};

function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

async function cleanPublicDirectory(rootDir) {
  const publicDir = path.join(rootDir, 'public');
  await fs.rm(publicDir, { recursive: true, force: true });
  await fs.mkdir(publicDir, { recursive: true });
}

function runProcess(command, args, rootDir) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32' // Use shell on Windows to find npm.cmd
  });
  
  if (result.error) {
    return 1;
  }

  return result.status ?? 1;
}

async function runReleasePipeline(argv = process.argv.slice(2), deps = {}) {
  const rootDir = deps.rootDir ?? process.cwd();
  const log = deps.log ?? console.log;
  const errorLog = deps.errorLog ?? console.error;
  const doCleanup = deps.cleanPublicDirectory ?? cleanPublicDirectory;
  const runStep = deps.runProcess ?? runProcess;
  const productionGuard = deps.assertProductionSafety ?? assertProductionSafety;
  const generateScript = deps.generateDeployScript ?? generateDeployScript;

  log('Step 1/4: Empty public folder');
  try {
    await doCleanup(rootDir);
  } catch (error) {
    errorLog(`Public folder cleanup failed: ${error.message}`);
    return EXIT_CODES.CLEANUP_FAILED;
  }

  log('Step 2/4: Run tests');
  const testExitCode = runStep(npmCommand(), ['test'], rootDir);
  if (testExitCode !== 0) {
    errorLog(`Tests failed with exit code ${testExitCode}.`);
    return EXIT_CODES.TESTS_FAILED;
  }

  log('Step 3/4: Build production artifacts');
  try {
    await productionGuard(rootDir);
  } catch (error) {
    errorLog(error.message);
    return EXIT_CODES.PRODUCTION_GUARD_FAILED;
  }

  const buildExitCode = runStep(npmCommand(), ['run', 'build:angular'], rootDir);
  if (buildExitCode !== 0) {
    errorLog(`Production build failed with exit code ${buildExitCode}.`);
    return EXIT_CODES.BUILD_FAILED;
  }

  log('Step 4/4: Generate and execute deployment script');
  let deployScriptPath;
  try {
    deployScriptPath = await generateScript(rootDir);
  } catch (error) {
    errorLog(`Deploy script generation failed: ${error.message}`);
    return EXIT_CODES.GENERATE_DEPLOY_SCRIPT_FAILED;
  }

  console.log(`Arguments for deployment script: ${argv.join(' ')}`);
  const deployExitCode = runStep(process.execPath, [deployScriptPath, ...argv], rootDir);
  if (deployExitCode !== 0) {
    errorLog(`Deployment failed with exit code ${deployExitCode}.`);
    return EXIT_CODES.DEPLOY_FAILED;
  }

  log('Release pipeline completed successfully.');
  return EXIT_CODES.SUCCESS;
}

if (require.main === module) {
  runReleasePipeline()
    .then(code => process.exit(code))
    .catch(error => {
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = {
  EXIT_CODES,
  runReleasePipeline,
  cleanPublicDirectory
};
