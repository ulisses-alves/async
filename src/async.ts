import {
  Util
, WorkerPool
, WorkerPoolFactory
, CancelablePromise
, AsyncAction
, Async
} from './core'

export default function (util: Util, workerPool: WorkerPoolFactory) : Async {
  let pool: WorkerPool = null

  let async: any = <T>(action: AsyncAction<T>, scope: any, args: any[]) => {
    if (!pool) async.pool(8)

    let cancel: () => void
    let cancellation = new Promise(resolve => cancel = resolve)

    let work: any = pool.postMessage({
      action: util.source(action),
      scope: scope,
      args: args
    }, cancellation)
    .then(e => e.data)

    work.cancel = cancel

    return <CancelablePromise<T>>work
  }

  async.pool = (size: number) => {
    if (pool) pool.killAll()
    pool = workerPool(size)
  }

  return <Async>async
}
