let browserify = require('browserify')
let gulp = require('gulp')
let source = require('vinyl-source-stream')
let buffer = require('vinyl-buffer')
let uglify = require('gulp-uglify')
let sourcemaps = require('gulp-sourcemaps')
let gutil = require('gulp-util')
let tap = require('gulp-tap')
let rename = require('gulp-rename')
let tsify = require('tsify')
let babelify = require('babelify')

module.exports = gulp.task('build', ['clean'], () => {
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
