var gulp = require('gulp')
var gls = require('gulp-live-server')

module.exports = gulp.task('serve', function () {
  var server = gls.static('.', 3000)
  server.start()
  gulp.watch(['dist/*.js'], (f) => server.notify(f))
})
