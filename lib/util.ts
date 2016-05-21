interface Util {
  source(fn: Function) : string
  scriptBlob(src: string) : string
}

let util: Util = {
  source: (fn) => {
    return '(' + fn.toString() + ')'
  },
  scriptBlob: (src) => {
    var blob = new Blob([src], {type: 'text/javascript'})
    return URL.createObjectURL(blob)
  }
}

export default util
