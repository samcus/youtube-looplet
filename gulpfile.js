var
gulp = require("gulp"),
sass = require("gulp-sass"),
sassGlob = require("gulp-sass-glob"),
watch = require("gulp-watch"),
concat = require("gulp-concat");

gulp.task('default', ['sass', 'concatJS']);

gulp.task('sass', function(){
  gulp.src('src/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(gulp.dest('resources/stylesheets'));
});

gulp.task('concatJS', function(){
  return gulp.src('src/javascript/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('resources/javascript'));
});

gulp.watch('src/scss/**/*.scss', ['sass']);
