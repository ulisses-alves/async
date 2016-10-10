import {
  WorkerFactory
, WorkerPool
, WorkerPoolFactory
, WorkerPoolMessage
} from './core'

interface QueueItem {
  (value: Worker) : void
}

interface WorkerCallback {
  (e: MessageEvent|ErrorEvent) : void
}

let noop = () => {}

class WorkerPoolImpl implements WorkerPool {
  private workers: Array<Worker>
  private idles: Array<Worker>
  private queue: Array<QueueItem>

  constructor(private factory: WorkerFactory, private size: number) {
    this.workers = []
    this.idles = []
    this.queue = []
  }

  postMessage(message: WorkerPoolMessage,
    cancellation: Promise<any>): Promise<MessageEvent> {
    return this.getWorker()
    .then(worker =>
      new Promise((resolve, reject) => {
        worker.onmessage = this.handler(worker, resolve)
        worker.onerror = this.handler(worker, reject)
        worker.postMessage(message)
        cancellation.then(this.handler(worker, () => worker.terminate()))
      }))
  }

  killAll(): void {
    this.workers.forEach(w => w.terminate())
    this.workers = []
    this.idles = []
  }

  private getWorker(): Promise<Worker> {
    let worker = this.idles.pop()

    if (worker) return Promise.resolve(worker)

    if (this.workers.length < this.size) {
      worker = this.factory()
      this.workers.push(worker)
      return Promise.resolve(worker)
    }

    return new Promise(resolve => this.queue.push(resolve))
  }

  private handler(worker: Worker, callback: WorkerCallback): WorkerCallback {
    return (e: MessageEvent|ErrorEvent) => {
      worker.onmessage = noop
      worker.onerror = noop

      callback(e)

      let notify = this.queue.pop()

      if (notify) return notify(worker)

      this.idles.push(worker)
    }
  }
}

export default function (workerFactory: WorkerFactory): WorkerPoolFactory {
  return (size: number): WorkerPool =>
    new WorkerPoolImpl(workerFactory, size)
}
