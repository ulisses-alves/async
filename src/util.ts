import {Util, BlobFactory} from './async.d.ts'

export default function (Blob: BlobFactory, Url: URL) : Util {
  return {
    source: (fn: Function) : string => {
      return `(${fn.toString()})`
    },
    scriptUrl: (src: string) : string => {
      const blob = Blob([src], {type: 'text/javascript'})
      return Url.createObjectURL(blob)
    }
  }
}
