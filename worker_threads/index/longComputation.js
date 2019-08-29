const { Worker, parentPort, isMainThread, workerData } = require('worker_threads');

if (isMainThread) {
    module.exports = (num = 1e10) => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: {
                    name: 'Randal'
                }
            });
            worker.postMessage(num);
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', code => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
} else {
    const longComputation = (val) => {
        let sum = 0;
        for (let i = 0; i < val; i++) {
            sum += i;
        };
        return sum;
    };

    parentPort.on('message', (msg) => {
        parentPort.postMessage(longComputation(msg));
    });
}
