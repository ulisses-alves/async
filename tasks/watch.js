var gulp = require('gulp')
var watch = require('gulp-watch')

module.exports = gulp.task('watch', () =>
  watch('src/**/*', () => gulp.run('build')))
