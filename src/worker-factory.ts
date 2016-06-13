import {Util, WorkerFactory} from './async.d.ts'

export default function (util: Util, metadata: Function) : WorkerFactory {
  const source = util.source(metadata)
  const sourceInvoke = `${source}.call(this)`
  const scriptUrl = util.scriptUrl(sourceInvoke)

  return <WorkerFactory>{
    createWorker: () => new Worker(scriptUrl)
  }
}
