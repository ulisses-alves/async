var util = require('./util')
var createWorker = require('./create-worker')

var createWorkerSrc = util.source(createWorker) + '.call(this)'
var workerBlob = util.scriptBlob(createWorkerSrc)

function async(action, scope, args) {
  var actionSrc = util.source(action)
  var worker = new Worker(workerBlob)

  return new Promise(function (resolve, reject) {
    worker.onmessage = messageHandler(resolve)
    worker.onerror = errorHandler(reject)
    worker.postMessage({
      action: actionSrc,
      scope: scope,
      args: args
    })
  })
}

function messageHandler(resolve) {
  return function (e) {
    resolve(e.data)
    this.terminate()
  }
}

function errorHandler(reject) {
  return function (e) {
    reject(e)
    this.terminate()
  }
}

module.exports = async
