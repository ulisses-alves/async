function createWorker() {
  this.onmessage = function (e) {
    var action = parseAction(e.data.action)
    var result = action.apply(e.data.scope, e.data.args)
    this.postMessage(result)
  }

  function parseAction(src) {
    var body = 'return (' + src + ')'
    var fn = new Function(body)
    return fn()
  }
}

module.exports = createWorker
