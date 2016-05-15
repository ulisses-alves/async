var util = {
  source: function (fn) {
    return '(' + fn.toString() + ')'
  },
  scriptBlob: function (src) {
    var blob = new Blob([src], {type: 'text/javascript'})
    return URL.createObjectURL(blob)
  }
}

module.exports = util
