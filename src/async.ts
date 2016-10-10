import {
  Async
, AsyncAction
, CancelablePromise
, Util
, WorkerPool
, WorkerPoolFactory
} from './core'

export default function (util: Util, workerPool: WorkerPoolFactory): Async {
  let pool: WorkerPool

  let async: any = <T>(action: AsyncAction<T>, scope: any, args: any[]) => {
    if (!pool) async.pool(8)

    let cancel: (() => any) | null = null
    let cancellation = new Promise(resolve => cancel = resolve)

    let work: any = pool.postMessage({
      action: util.source(action)
    , args
    , scope
    }, cancellation)
    .then(e => <T>e.data)

    work.cancel = () => cancel && cancel()

    return <CancelablePromise<T>> work
  }

  async.pool = (size: number): void => {
    if (pool) pool.killAll()
    pool = workerPool(size)
  }

  return <Async> async
}
