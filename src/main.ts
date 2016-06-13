import workerMeta from './worker-meta'
import BlobFactory from './blob-factory'
import Url from './url-wrapper'
import Util from './util'
import WorkerFactory from './worker-factory'
import WorkerPool from './worker-pool'
import Async from './async'

const blobFactory = BlobFactory()
const url = Url()
const util = Util(blobFactory, url)
const workerFactory = WorkerFactory(util, workerMeta)
const workerPool = WorkerPool(workerFactory)

export = Async(util, workerPool)
