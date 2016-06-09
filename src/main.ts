import workerMeta from './worker-meta'
import Util from './util'
import WorkerFactory from './worker-factory'
import WorkerPool from './worker-pool'
import Async from './async'

const util = Util()
const workerFactory = WorkerFactory(util, workerMeta)
const workerPool = WorkerPool(workerFactory)

export = Async(util, workerPool)
