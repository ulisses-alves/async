function createWorker(this: Worker) {
  const parseAction = (src: string) => {
    const body = `return (${src})`
    const fn = new Function(body)
    return fn()
  }

  this.onmessage = (e: MessageEvent) => {
    const action = parseAction(e.data.action)
    const result = action.apply(e.data.scope, e.data.args)
    this.postMessage(result)
  }
}

export default createWorker
