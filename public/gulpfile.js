const
gulp = require("gulp"),
sass = require("gulp-sass"),
sassGlob = require("gulp-sass-glob"),
watch = require("gulp-watch"),
concat = require("gulp-concat"),
cssnano = require('gulp-cssnano'),
del = require('del');

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('default', [
  'clean','sass','concatJS','copy','clean:watch'
]);

gulp.task('clean', function (cb) {
    return del(['resources/**/*']);
});

gulp.task('sass',['clean'], function(cb){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('resources/stylesheets'));
});

gulp.task('concatJS',['clean','sass'], function(cb){
  return gulp.src('src/javascript/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('resources/javascript'));
});

gulp.task('copy',['clean','sass','concatJS'], function(cb){
  return gulp.src(['src/**/*','!src/{scss,scss/**}','!src/{javascript,javascript/**}'])
    .pipe(gulp.dest('resources/'))
    .on('error', onError);
});

gulp.task('clean:watch', function(cb){
  return gulp.watch('src/**/*', ["clean","sass","concatJS","copy"])
  .on('error', onError);
});
