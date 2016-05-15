var gulp = require('gulp')
var del = require('del')

module.exports = gulp.task('clean', () => del(['dist/*']))
