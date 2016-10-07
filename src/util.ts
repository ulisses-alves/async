import {Util, BlobFactory, URLStatic} from './core'

export default function (Blob: BlobFactory, URL: URLStatic) : Util {
  const util: Util = {
    source: (fn: Function) : string => {
      return `(${fn.toString()})`
    },
    sourceCall: (fn: Function) : string => {
      return `${util.source(fn)}.call(this)`
    },
    scriptUrl: (src: string) : string => {
      const blob = Blob([src], {type: 'text/javascript'})
      return URL.createObjectURL(blob)
    }
  }

  return util
}
