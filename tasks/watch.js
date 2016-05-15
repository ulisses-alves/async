var gulp = require('gulp')
var watch = require('gulp-watch')

module.exports = gulp.task('watch', () =>
  watch('lib/**/*', () => gulp.run('build')))
