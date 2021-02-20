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

export type ComplexAsyncAction<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> =
    {() : T} |
    {(p1: T1) : T} |
    {(p1: T1, p2: T2) : T} |
    {(p1: T1, p2: T2, p3: T3) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7:T7) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7:T7, p8:T8) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7:T7, p8:T8, p9:T9) : T} |
    {(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7:T7, p8:T8, p9:T9, p10:T10) : T}

export type AsyncAction<T> = ComplexAsyncAction<T, void, void, void, void, void, void, void, void, void, void>

export interface Async {
  <T>(action: ComplexAsyncAction<T,void,void, void, void, void, void, void, void, void, void>, scope: any, args: any[]) : CancelablePromise<T>
  <T, T1>(action: ComplexAsyncAction<T,T1,void, void, void, void, void, void, void, void, void>, scope: any, args: [T1]) : CancelablePromise<T>
  <T, T1, T2>(action: ComplexAsyncAction<T,T1,T2, void, void, void, void, void, void, void, void>, scope: any, args: [T1, T2]) : CancelablePromise<T>
  <T, T1, T2, T3>(action: ComplexAsyncAction<T,T1,T2,T3, void, void, void, void, void, void, void>, scope: any, args: [T1, T2, T3]) : CancelablePromise<T>
  <T, T1, T2, T3, T4>(action: ComplexAsyncAction<T,T1,T2,T3,T4, void, void, void, void, void, void>, scope: any, args: [T1, T2, T3, T4]) : CancelablePromise<T>
  <T, T1, T2, T3, T4, T5>(action: ComplexAsyncAction<T,T1,T2,T3,T4,T5, void, void, void, void, void>, scope: any, args: [T1, T2, T3, T4, T5]) : CancelablePromise<T>
  <T, T1, T2, T3, T4, T5, T6>(action: ComplexAsyncAction<T,T1,T2,T3,T4,T5,T6, void, void, void, void>, scope: any, args: [T1, T2, T3, T4, T5, T6]) : CancelablePromise<T>
  <T, T1, T2, T3, T4, T5, T6, T7>(action: ComplexAsyncAction<T,T1,T2,T3,T4,T5,T6,T7, void, void, void>, scope: any, args: [T1, T2, T3, T4, T5, T6, T7]) : CancelablePromise<T>
  <T, T1, T2, T3, T4, T5, T6, T7, T8>(action: ComplexAsyncAction<T,T1,T2,T3,T4,T5,T6,T7,T8, void, void>, scope: any, args: [T1, T2, T3, T4, T5, T6, T7, T8]) : CancelablePromise<T>
  <T, T1, T2, T3, T4, T5, T6, T7, T8, T9>(action: ComplexAsyncAction<T,T1,T2,T3,T4,T5,T6,T7,T8,T9, void>, scope: any, args: [T1, T2, T3, T4, T5, T6, T7, T8, T9]) : CancelablePromise<T>
  <T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(action: ComplexAsyncAction<T,T1,T2,T3,T4,T5,T6,T7,T8,T9,T10>, scope: any, args: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]) : CancelablePromise<T>
  pool: (size: number) => void
}