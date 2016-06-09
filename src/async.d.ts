export interface Util {
  source(fn: Function) : string
  scriptBlob(src: string) : string
}

export interface WorkerFactory {
  createWorker() : Worker
}

export interface WorkerPoolMessage {
  action: string
  scope?: any
  args?: Array<any>
}

export interface WorkerPool {
  postMessage(message: WorkerPoolMessage, cancellation: Promise<any>) :
    Promise<any>
  killAll() : void
}

export interface WorkerPoolFactory {
  (size: number) : WorkerPool
}

export interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void
}

export interface AsyncAction<T> {
  (...p: any[]) : T
}

export interface Async {
  <T>(action: AsyncAction<T>, scope: any, args: any[]) : CancelablePromise<T>
  pool: (size: number) => void
}
