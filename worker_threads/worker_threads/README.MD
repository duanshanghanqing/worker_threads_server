如何创建多线程？
worker_threads模块中比较重要的几个类：
MessageChannel: 用于创建异步、双向通信的通道实例。MessageChannel实例包含两个属性port1和port2，这两个属性都是MessagePort的实例。

MessagePort： 用于表示MessageChannel通道的终端，用于Worker之间传输结构化数据、内存区域和其他的MessagePort。MessagePort继承了EventEmitter，因此可以使用postMessage和on方法实现消息的传递与接收。

Worker： 用于创建单独的JS线程。

worker_threads模块中比较重要的几个属性：
parentPort： 子线程中的parentPort指向可以与主线程进行通信的MessagePort。

子线程向父线程发送消息

parentPort.postMessage(...)
复制代码
子线程接受来自父线程的消息

parentPort.on('message', (msg) => ...)
复制代码
isMainThread： 用于区分当前文件是否在主线程中执行

workerData： 用于传递给Worker构造函数的data副本，在子线程中可以通过workerData获取到父进程传入的数据。


# 01：基本使用

# 02：线程间如何传输数据？

# 03：线程间如何共享内存？

    如果postMessage中的value是SharedArrayBuffer的话，则线程之间就可以共享内存

# 04：使用 MessageChannel 让两个子线程直接通信
