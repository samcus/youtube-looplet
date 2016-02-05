var
gulp = require("gulp"),
sass = require("gulp-sass"),
sassGlob = require("gulp-sass-glob");

gulp.task('default', ['sass']);

gulp.task('sass', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(gulp.dest('resources/stylesheets'));
});
