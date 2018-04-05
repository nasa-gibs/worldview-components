/* eslint no-console: "off" */

'use strict';
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src([
    '**/*.js',
    '!node_modules/{,/**}',
    '!lib/{,/**}',
    '!browser/{,/**}'
  ]).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('lib', function() {
  del(['./lib/**/*']);
  gulp.src(['./src/scripts/**/*.js'])
    .pipe(plumber())
    .pipe(babel({
      presets: ['react', 'env']
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('browser', function() {
  var browserifyBundle = function() {
    return browserify({
      entries: ['./src/scripts/index.js'],
      transform: [
        [
          'babelify', {
            'presets': [ 'react', 'env' ],
            'sourceMaps': true
          }
        ]
      ],
      standalone: 'WVC',
      debug: true
    })
      .transform('browserify-shim', {global: true})
      .bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); });
  };

  browserifyBundle() // Unminified
    .pipe(source('wvc.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('browser'));

  browserifyBundle() // Minified
    .pipe(source('wvc.min.js'))
    .pipe(buffer())
    .pipe(uglify().on('error', function(e) { console.log(e); }))
    .pipe(gulp.dest('browser'));
});

gulp.task('clean-browser', function(cb) {
  del(['./browser/*'], cb);
});

gulp.task('watch', function() {
  gulp.watch('src/scripts/**/**/*.js', ['browser']);
});
gulp.task('default', ['clean-browser', 'browser', 'lib']);
