import util from './util'
import WorkerPool from './worker-pool'

interface Async {
  (action: Function, scope: any, args: Array<any>) : Promise<any>
  pool(size: number) : void
}

var pool: WorkerPool = null

var async = <Async> function (action, scope, args) {
  if (!pool) async.pool(8)

  var cancel: Function = null
  var cancellation = new Promise((resolve) => cancel = resolve)

  var work = pool.postMessage({
    action: util.source(action),
    scope: scope,
    args: args
  }, cancellation)
  .then((e) => e.data)

  //work.cancel = cancel

  return work
}

async.pool = (size) => {
  if (pool) pool.killAll()
  pool = new WorkerPool(size)
}

export = async
