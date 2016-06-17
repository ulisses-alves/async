import {Util, BlobFactory} from './async.d.ts'

export default function (Blob: BlobFactory, Url: URL) : Util {
  const util: Util = {
    source: (fn: Function) : string => {
      return `(${fn.toString()})`
    },
    sourceCall: (fn: Function) : string => {
      return `${util.source(fn)}.call(this)`
    },
    scriptUrl: (src: string) : string => {
      const blob = Blob([src], {type: 'text/javascript'})
      return Url.createObjectURL(blob)
    }
  }

  return util
}
