
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');


function compile(watch) {
  
  var bundler = watchify(
    browserify('./src/js/index.js', { debug: true })
      .transform(babel.configure({
          presets: ["es2015"],
          plugins: ["transform-remove-strict-mode"]
      }))
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }
  
  rebundle();
}


gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch("./src/sass/**/*", ['sass']);
});

gulp.task('build', function() { 
  return compile(); 
});

gulp.task('watch', function() { 
  return compile(true);
});

gulp.task('default', ['watch', 'sass:watch']);