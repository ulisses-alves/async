import Async from './async'
import BlobFactory from './blob-factory'
import Util from './util'
import workerConstructor from './worker-constructor'
import WorkerFactory from './worker-factory'
import WorkerPool from './worker-pool'

const blobFactory = BlobFactory()
const util = Util(blobFactory, URL)
const workerFactory = WorkerFactory(util, workerConstructor)
const workerPool = WorkerPool(workerFactory)
const async = Async(util, workerPool)

export = async
