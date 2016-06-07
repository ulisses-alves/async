var gulp = require('gulp')
var karma = require('karma')

module.exports = gulp.task('test', (done) => {
  new karma.Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, () => done())
  .start()
})
