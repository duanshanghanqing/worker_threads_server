
const { Worker, isMainThread, parentPort } = require('worker_threads');

// 主线程
if (isMainThread) {
    const sab = new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100);
    const ia = new Int32Array(sab);

    for (let i = 0; i < ia.length; i++) {
        ia[i] = i;
    }
    console.log("this is the main thread");
    for (let i = 0; i < 1; i++) {
        let w = new Worker(__filename);
        console.log('before transfer: ', sab);
        w.postMessage([sab]); // 如果ArrayBuffer是通过value传输的（且在transferList中不存在），则传输过去的是副本
        setTimeout(() => {
            console.log('after transfer: ', sab);
        }, 1000);
    }
} else {
    // 子线程监听主线程发送的消息
    parentPort.on('message', (msg) => {
        console.log(msg); // 接收到的是传入参数的 副本
    });
}
