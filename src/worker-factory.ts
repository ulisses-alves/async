import {Util, WorkerFactory} from './async.d.ts'

class WorkerFactoryImpl implements WorkerFactory {
  private blobUrl: string

  constructor(util: Util, metadata: Function) {
    var source = util.source(metadata) + '.call(this)'
    this.blobUrl = util.scriptBlob(source)
  }

  createWorker() : Worker {
    return new Worker(this.blobUrl)
  }
}

export default function (util: Util, metadata: Function) : WorkerFactory {
  return new WorkerFactoryImpl(util, metadata)
}
