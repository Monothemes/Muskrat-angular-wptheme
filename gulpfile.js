var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./tasks', { recurse: true });

gulp.task('init', ['scss', 'scripts', 'angular', 'bootstrap-js']);

//gulp.task('default', ['init', 'watch']);