var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var tap = require('gulp-tap')
var rename = require('gulp-rename')
var tsify = require('tsify')
var babelify = require('babelify')

module.exports = gulp.task('build', function () {
  return browserify({
    entries: './src/main.ts',
    debug: true,
    standalone: 'async'
  })
  .plugin(tsify)
  .transform('babelify', {extensions: ['.ts', '.tsx']})
  .bundle()
  .pipe(source('async.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'))
})
