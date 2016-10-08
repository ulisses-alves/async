export interface BlobFactory {
  (blobParts: string[], options: {type: string}): Blob
}

export interface URLStatic {
  createObjectURL(blob: Blob): string
}

export interface Util {
  source(fn: Function): string
  sourceCall(fn: Function): string
  scriptUrl(src: string): string
}

export interface WorkerFactory {
  () : Worker
}

export interface WorkerPoolMessage {
  action: string
  scope?: any
  args?: Array<any>
}

export interface WorkerPool {
  postMessage(message: WorkerPoolMessage,
    cancellation: Promise<void>): Promise<MessageEvent>
  killAll(): void
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
