var util = require('./util')
var WorkerPool = require('./worker-pool')

var pool = null

function async(action, scope, args) {
  if (!pool) async.pool(8)

  return pool.postMessage({
    action: util.source(action),
    scope: scope,
    args: args
  }).then(function (e) {
    return e.data
  })
}

async.pool = function (size) {
  if (pool) pool.killAll()
  pool = WorkerPool(size)
}

module.exports = async
