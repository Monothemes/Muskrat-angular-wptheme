var gulp    = require('gulp');
var argv    = require('yargs').argv;
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var notify  = require('gulp-notify');
var plumber = require('gulp-plumber');
var gulpif  = require('gulp-if');

gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('assets/js'));
})

gulp.task('scripts', function (){
    gulp.src([
   		'src/js/app.js',
		'src/js/app.factory.js',
		'src/js/app.filter.js',
		'src/js/app.directive.js',
		'src/js/app.controller.js',
 		'src/js/modernizr.js',
	])
    .pipe(concat('scripts.js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, notify('monothemes: Uglified scripts.')))
    .pipe(notify('monothemes: Compiled scripts.'))
    .pipe(gulp.dest('assets/js'));
})

gulp.task('angular', function(){
	gulp.src([
		'node_modules/tinymce/tinymce.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/angular-resource/angular-resource.min.js',
		'node_modules/angular-ui-router/build/angular-ui-router.min.js',
		'node_modules/angular-ui-tinymce/src/tinymce.js',
	])
	.pipe(concat('angular.min.js'))
	.pipe(gulp.dest('assets/js'));
	
	gulp.src([
		'node_modules/angular/angular.min.js.map', 
		'node_modules/angular-resource/angular-resource.min.js.map'
	])
	.pipe(gulp.dest('assets/js'));
	
	gulp.src([
		'node_modules/tinymce/themes/modern/*.js',
	])
	.pipe(gulp.dest('assets/js/themes/modern/'));
	
	gulp.src([
		'node_modules/tinymce/skins/lightgray/*.css',
	])
	.pipe(gulp.dest('assets/js/skins/lightgray'));
	
	gulp.src([
		'node_modules/tinymce/skins/lightgray/fonts/*',
	])
	.pipe(gulp.dest('assets/js/skins/lightgray/fonts'));
})

gulp.task('bootstrap-js', function(){
	gulp.src([
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js'
	])
	.pipe(concat('bootstrap.js'))
	.pipe(gulp.dest('assets/js'));
});

