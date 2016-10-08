let gulp = require('gulp')
let karma = require('karma')

module.exports = gulp.task('test', ['build'], (done) => {
  return new karma.Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, function () {
    done()
  }).start()
})
