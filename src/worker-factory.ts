import {Util, WorkerFactory} from './async.d.ts'

export default function (util: Util, workerConstructor: Function)
: WorkerFactory {
  const source = util.sourceCall(workerConstructor)
  const scriptUrl = util.scriptUrl(source)
  return () => new Worker(scriptUrl)
}
