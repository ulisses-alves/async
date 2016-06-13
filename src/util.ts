import {Util, BlobFactory, UrlWrapper} from './async.d.ts'
import Blob from './blob-factory'

export default function (Blob: BlobFactory, Url: UrlWrapper) : Util {
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
