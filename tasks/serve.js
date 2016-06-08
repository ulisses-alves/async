var gulp = require('gulp')
var gls = require('gulp-live-server')

module.exports = gulp.task('serve', () => {
  var port = process.env.npm_package_config_start_port || '3000'
  var server = gls.static('.', port)
  server.start()
  gulp.watch(['dist/*.js'], f => server.notify(f))
})
