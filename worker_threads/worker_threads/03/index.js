const { Worker, isMainThread, parentPort } = require('worker_threads');
// 主线程
if (isMainThread) {
    // 创建共享内存
    const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 5);
    const ia = new Int32Array(sab);
    for (let i = 0; i < ia.length; i++) {
        ia[i] = i;
    }
    
    // 这里创建两个线程
    for (let i = 0; i < 2; i++) {
        let w = new Worker(__filename);
        w.postMessage(sab);
        w.on('message', () => {
            console.log(ia);
        });
    }
} else {
    parentPort.on('message', (msg) => {
        const ia = new Int32Array(msg, 0, 1);
        ia[0] = ia[0] + 1;
        parentPort.postMessage('done');
    });
}
