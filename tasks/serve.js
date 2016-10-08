let gulp = require('gulp')
let gls = require('gulp-live-server')

module.exports = gulp.task('serve', () => {
  let port = process.env.npm_package_config_start_port || '3000'
  let server = gls.static('.', port)
  server.start()
  gulp.watch(['dist/*.js'], f => server.notify(f))
})
