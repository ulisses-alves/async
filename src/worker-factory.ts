import util from './util'
import metadata from './worker-meta'

class WorkerFactory {
  private blobUrl: string

  constructor() {
    var source = util.source(metadata) + '.call(this)'
    this.blobUrl = util.scriptBlob(source)
  }

  createWorker() : Worker {
    return new Worker(this.blobUrl)
  }
}

export default WorkerFactory
