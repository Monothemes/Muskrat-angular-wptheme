var gulp = require('gulp');

gulp.task('watch', function(){
	gulp.watch("src/js/**/*.js", ['scripts']);
	gulp.watch("src/scss/**/*.scss", ['scss']);
});