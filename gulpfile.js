const
gulp = require("gulp"),
sass = require("gulp-sass"),
sassGlob = require("gulp-sass-glob"),
watch = require("gulp-watch"),
concat = require("gulp-concat"),
del = require('del');

del.sync(['resources/**/*']);

gulp.task('default', [
  'copy', 'sass', 'concatJS',
  'sass:watch', 'copy:watch', 'concatJS:watch'
]);

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(gulp.dest('resources/stylesheets'));
});

gulp.task('concatJS', function(){
  return gulp.src('src/javascript/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('resources/javascript'));
});

gulp.task('copy', function(){
  return gulp.src(['src/**/*','!src/{scss,scss/**}','!src/{javascript,javascript/**}'])
    .pipe(gulp.dest('resources/'));
});

gulp.task('sass:watch', function(){
  gulp.watch('src/scss/**/*.scss', ["sass"]);
});

gulp.task('concatJS:watch', function(){
  gulp.watch('src/javascript/**/*.js', ["concatJS"]);
});

gulp.task('copy:watch', function(){
  gulp.watch(['src/**/*','!src/{scss,scss/**}','!src/{javascript,javascript/**}'], ["copy"])
});
