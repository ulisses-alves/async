import util from './util'
import WorkerPool from './worker-pool'

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
  pool = new WorkerPool(size)
}

export default <Async>async
