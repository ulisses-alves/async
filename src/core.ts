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

export interface AsyncPool {
  pool: (size: number) => void
}

export type AsyncAction<TResult, TArg1, TArg2> =
  {(this: void, arg1: TArg1): TResult} |
  {(this: void, arg1: TArg1, arg2: TArg2): TResult}

export interface Async {
  <TResult, TArg1, TArg2>(
    action: AsyncAction<TResult, TArg1, TArg2>,
    args: [TArg1, TArg2]): CancelablePromise<TResult>
}
