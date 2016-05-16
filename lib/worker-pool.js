var util = require('./util')
var createWorker = require('./create-worker')

var createWorkerSrc = util.source(createWorker) + '.call(this)'
var workerBlob = util.scriptBlob(createWorkerSrc)

function WorkerPool(size) {
  var workers = []
  var idles = []
  var queue = []

  return {
    postMessage: function (message, cancellation) {
      return getWorker().then(function (worker) {
        return new Promise(function (resolve, reject) {
          worker.onmessage = handle(resolve)
          worker.onerror = handle(reject)
          worker.postMessage(message)

          cancellation.then(handle(function () {
            worker.terminate()
          }))
        })
      })

      return new Promise(function (resolve) {
        callback.call(undefined, worker, resolve)
      })
      .then(function () {
        workers.push(worker)
      })
    },
    killAll: function () {
      workers.forEach(function (w) { w.terminate() })
      workers = []
      idles = []
    }
  }

  function handle(callback) {
    return function (e) {
      this.onmessage = null
      this.onerror = null

      callback(e)

      if (queue.length) {
        var notify = queue.pop()
        return notify(this)
      }

      idles.push(this)
    }
  }

  function getWorker() {
    var worker = idles.pop()

    if (worker) return Promise.resolve(worker)

    if (workers.length < size) {
      worker = new Worker(workerBlob)
      workers.push(worker)
      return Promise.resolve(worker)
    }

    return new Promise(function (resolve) {
      queue.push(resolve)
    })
  }
}

module.exports = WorkerPool
