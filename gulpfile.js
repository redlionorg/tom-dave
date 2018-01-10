const gulp = require('gulp')
const sass = require('gulp-sass')
const minify = require('gulp-minify-css')
 
gulp.task('sass', function () {
  return gulp.src('./app/index.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(minify())
    .pipe(gulp.dest('./dist'))
});
 
gulp.task('default', ['sass'], function () {
  gulp.watch(['./app/scss/**/*.scss', './app/scss/index.scss'], ['sass'])
});