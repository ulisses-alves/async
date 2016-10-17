import {
  Async
, AsyncAction
, AsyncPool
, CancelablePromise
, Util
, WorkerPool
, WorkerPoolFactory
} from './core'

export default function (util: Util, workerPool: WorkerPoolFactory) {
  let pool: WorkerPool

  let async: any = <TResult, TArg1, TArg2>(
    action: AsyncAction<TResult, TArg1, TArg2>, args: any[]) => {
    if (!pool) async.pool(8)

    let cancel: (() => any) | null = null
    let cancellation = new Promise(resolve => cancel = resolve)

    let work: any = pool.postMessage({
      action: util.source(action)
    , args
    , scope: null
    }, cancellation)
    .then(e => <TResult> e.data)

    work.cancel = () => cancel && cancel()

    return <CancelablePromise<TResult>> work
  }

  async.pool = (size: number): void => {
    if (pool) pool.killAll()
    pool = workerPool(size)
  }

  return <Async & AsyncPool> async
}
