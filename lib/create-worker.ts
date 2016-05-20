function createWorker() {
  let parseAction = (src: string) => {
    var body = 'return (' + src + ')'
    var fn = new Function(body)
    return fn()
  }

  this.onmessage = (e: MessageEvent) => {
    var action = parseAction(e.data.action)
    var result = action.apply(e.data.scope, e.data.args)
    this.postMessage(result)
  }
}

export default createWorker
