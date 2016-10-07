'use strict';
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var del = require('del');

gulp.task('lib', function() {
  del(['./lib/**/*']);
  gulp.src(['./src/scripts/**/*.js'])
    .pipe(plumber())
    .pipe(babel({
      presets: ["react", "es2015"]
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
            "presets": [
              "react",
              "es2015"
            ],
            "sourceMaps": true
          }
        ]
      ],
      standalone: 'Animate',
      debug: true
    })
    .transform('browserify-shim')
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); });
  };

  browserifyBundle() // Unminified.
    .pipe(source('wv-animation.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('browser'));

  browserifyBundle() // Minified.
    .pipe(source('wv-animation.min.js'))
    .pipe(buffer())
    .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(gulp.dest('browser'));
});

gulp.task('clean-browser', function(cb) {
  del(['./browser/*'], cb);
});


gulp.task('watch', function() {
  gulp.watch('src/scripts/**/**/*.js', ['js']);
});
gulp.task('default', ['clean-browser', 'browser', 'lib']);

