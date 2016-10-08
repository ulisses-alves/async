import {
  BlobFactory
, URLStatic
, Util
} from './core'

export default function (Blob: BlobFactory, URL: URLStatic): Util {
  const util: Util = {
    scriptUrl: (src: string): string => {
      const blob = Blob([src], {type: 'text/javascript'})
      return URL.createObjectURL(blob)
    },
    source: (fn: Function): string => {
      return `(${fn.toString()})`
    },
    sourceCall: (fn: Function) : string => {
      return `${util.source(fn)}.call(this)`
    }
  }

  return util
}
