var gulp = require('gulp')

module.exports = gulp.task('dev', ['clean', 'build', 'watch', 'serve'])
