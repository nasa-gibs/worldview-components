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
var browserifyshim = require('browserify-shim');
var eslint = require('gulp-eslint');
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['./src/scripts/**/*.js',])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
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
      standalone: 'WVC',
      debug: true
    })
    .transform('browserify-shim', {global: true})
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); });
  };

  browserifyBundle() // Unminified.
    .pipe(source('wvc.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('browser'));

  browserifyBundle() // Minified.
    .pipe(source('wvc.min.js'))
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
  gulp.watch('src/scripts/**/**/*.js', ['browser']);
});
//gulp.task('lint', ['lint']);
gulp.task('default', ['clean-browser', 'browser', 'lib']);

