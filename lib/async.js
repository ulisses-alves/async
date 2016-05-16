var util = require('./util')
var WorkerPool = require('./worker-pool')

var pool = null

function async(action, scope, args) {
  if (!pool) async.pool(8)

  var cancel = null

  var work = pool.postMessage({
    action: util.source(action),
    scope: scope,
    args: args
  }, new Promise(function (resolve) {
    cancel = resolve
  })).then(function (e) {
    return e.data
  })

  work.cancel = cancel

  return work
}

async.pool = function (size) {
  if (pool) pool.killAll()
  pool = WorkerPool(size)
}

module.exports = async
