var gulp = require('gulp')

module.exports = gulp.task('watch', () =>
  gulp.watch('src/**/*', ['build', 'test']))
