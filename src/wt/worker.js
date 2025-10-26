import { parentPort, workerData } from 'node:worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
    if (parentPort) {
        parentPort.postMessage(result);
    }
};

const startComputation = () => {
    const n = workerData ? workerData.n : 0;
    const result = nthFibonacci(n);

    sendResult(result);
};

startComputation();
