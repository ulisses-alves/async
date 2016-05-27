import WorkerFactory from './worker-factory'

interface QueueItem {
  (value: Worker) : void
}

interface WorkerCallback {
  (e: Event) : void
}

export interface WorkerPoolMessage {
  action: string
  scope?: any
  args?: Array<any>
}

class WorkerPool {
  private workers: Array<Worker>
  private idles: Array<Worker>
  private queue: Array<QueueItem>
  private factory: WorkerFactory

  constructor(private size: number) {
    this.workers = []
    this.idles = []
    this.queue = []
    this.factory = new WorkerFactory()
  }

  postMessage(message: WorkerPoolMessage, cancellation: Promise<any>) :
  Promise<any> {
    return this.getWorker()
    .then(worker =>
      new Promise((resolve, reject) => {
        worker.onmessage = this.handler(resolve)
        worker.onerror = this.handler(reject)
        worker.postMessage(message)
        cancellation.then(this.handler(() => worker.terminate()))
      }))
  }

  killAll() : void {
    this.workers.forEach(w => w.terminate())
    this.workers = []
    this.idles = []
  }

  private getWorker() : Promise<Worker> {
    var worker = this.idles.pop()

    if (worker) return Promise.resolve(worker)

    if (this.workers.length < this.size) {
      worker = this.factory.createWorker()
      this.workers.push(worker)
      return Promise.resolve(worker)
    }

    return new Promise(resolve => this.queue.push(resolve))
  }

  private handler(callback: WorkerCallback) : WorkerCallback {
    let self = this

    return function (e: Event) {
      this.onmessage = null
      this.onerror = null

      callback(e)

      if (self.queue.length) {
        let notify = self.queue.pop()
        return notify(this)
      }

      self.idles.push(this)
    }
  }
}

export default WorkerPool
