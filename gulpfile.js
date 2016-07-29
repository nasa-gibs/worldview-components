'use strict';
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var browserify = require('browserify');


var bundle = function(relpath) {
  return browserify({
    entries: [relpath],
    transform: [
      [
        'babelify', {
          presets: [
            'es2015'
          ],
          "plugins": [
            "transform-react-jsx"
          ],
          sourceMaps: true
        }
      ]
    ],
    debug: true
  })
  .bundle();
};
var browserifyBuffer = function(_bundle, minify, theSource) {
  var stream = _bundle
    .pipe(source(theSource))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }));

  if (minify) {
    stream.pipe(uglify());
  }

  stream
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/javascripts'))
    .on('end', function() {
      console.log('File compiled & save.');
    });
};

gulp.task('style', function() {
  return gulp.src('./src/styles/app.styl')
    .pipe(stylus({
      'include css': true
  }))

gulp.task('js', function() {
  return browserifyBuffer(
    bundle('./src/scripts/wv-animation.js'),
    true,
    'app.js'
  );
});

gulp.task('watch', function() {
  gulp.watch('src/scripts/**/*.js', ['js']);
  gulp.watch('src/styles/*.styl', ['style']);
});
gulp.task('default', ['js', 'style']);
