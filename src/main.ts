import workerMeta from './worker-meta'
import BlobFactory from './blob-factory'
import Util from './util'
import WorkerFactory from './worker-factory'
import WorkerPool from './worker-pool'
import Async from './async'

const blobFactory = BlobFactory()
const util = Util(blobFactory, URL)
const workerFactory = WorkerFactory(util, workerMeta)
const workerPool = WorkerPool(workerFactory)

export = Async(util, workerPool)
