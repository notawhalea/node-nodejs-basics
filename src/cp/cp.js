import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdin, stdout } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [scriptPath, ...args]);
    stdin.pipe(child.stdin);
    child.stdout.pipe(stdout);

    child.on('error', (err) => {
        console.error(`Failed to start child process: ${err.message}`);
    });

    child.on('close', (code) => {
        console.log(`\nMaster process: Child process terminated with code ${code}`);
        stdin.unpipe(child.stdin);
        stdin.pause();
    });
};

spawnChildProcess([
    '--mode=interactive',
    '--iterations=5',
    'arg3',
    'argument with spaces'
]);
