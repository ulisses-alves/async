let gulp = require('gulp')
let del = require('del')

module.exports = gulp.task('clean', () => del(['dist/*']))
