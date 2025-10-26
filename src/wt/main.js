import os from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const startN = 10;
    const workerPromises = [];

    for (let i = 0; i < numCores; i++) {
        const n = startN + i;

        const worker = new Worker(workerPath, {
            workerData: { n }
        });

        const workerPromise = new Promise((resolve) => {
            worker.on('message', (data) => {
                resolve({
                    status: 'resolved',
                    data: data
                });
                worker.terminate();
            });

            worker.on('error', (err) => {
                resolve({
                    status: 'error',
                    data: null
                });
                worker.terminate();
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });

        workerPromises.push(workerPromise);
    }

    const finalResults = await Promise.all(workerPromises);
    console.log(finalResults);
};

await performCalculations();
