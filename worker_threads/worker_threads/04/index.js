const {
    isMainThread, parentPort, workerData, threadId,
    MessageChannel, MessagePort, Worker
} = require('worker_threads');

if (isMainThread) {
    const worker1 = new Worker(__filename);
    const worker2 = new Worker(__filename);
    const { port1, port2 } = new MessageChannel(); // 只能让两个子线程通信
    worker1.postMessage({ hereIsYourPort: port1, num: 1 }, [port1]);
    worker2.postMessage({ hereIsYourPort: port2, num: 2 }, [port2]);

} else {
    parentPort.once('message', (value) => {
        console.log(value);
        // 向其他线程发送消息
        value.hereIsYourPort.postMessage(value.num);
        // 监听接收其他线程消息
        value.hereIsYourPort.on('message', msg => {
            console.log(`thread ${threadId}: receive ${msg}`);
        });
    });
}
