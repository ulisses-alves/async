import {Util} from './async.d.ts'

let util: Util = {
  source: (fn: Function) : string => {
    return `(${fn.toString()})`
  },
  scriptBlob: (src: string) : string => {
    const blob = new Blob([src], {type: 'text/javascript'})
    return URL.createObjectURL(blob)
  }
}

export default function () : Util {
  return util
}
