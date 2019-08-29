const { Worker, parentPort, isMainThread, workerData } = require('worker_threads');

if (isMainThread) {
    const w = new Worker(__filename, {
        workerData: {
            name: 'Randal'
        }
    });
    // 主线程向子线程发送消息
    w.postMessage(1e10);
    const startTime = Date.now();
    // 主线程监听子线程发送的消息
    w.on('message', function (msg) {
        console.log('main thread get message: ' + msg);
        console.log('compute time ellapsed: ' + (Date.now() - startTime) / 1000);
    });
    console.log('main thread executing');
} else {
    const longComputation = (val) => {
        let sum = 0;
        for (let i = 0; i < val; i++) {
            sum += i;
        };
        return sum;
    };
    // 子线程监听主线程发送的消息
    parentPort.on('message', (msg) => {
        console.log(`${workerData.name} worker get message: ` + msg);
        // 子线程向主线程发送消息
        parentPort.postMessage(longComputation(msg));
    });
}

// node --experimental-worker index.js
