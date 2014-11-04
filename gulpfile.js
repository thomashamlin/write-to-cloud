/* jshint node:true */

'use strict';

var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var less = require('gulp-less');
// var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


/* Tasks */

// Project resources

gulp.task('css', function() {
  return gulp.src('less/*.less')
    .pipe(concat('type.css'))
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', function() {
  return gulp.src('html/*')
    .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(concat('type.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('type.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// External resources

gulp.task('bower_js', function() {
  return gulp.src('bower_components/**/*.{js,min.js,min.js.map}')
    .pipe(flatten())
    .pipe(gulp.dest('build/js'));
});

gulp.task('bower_css', function() {
  return gulp.src('bower_components/medium.js/medium.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', ['css', 'html', 'js', 'bower_js', 'bower_css']);

gulp.task('watch', function () {
  gulp.watch('less/*.less', ['css']);
  gulp.watch('html/*.html', ['html']);
  gulp.watch('js/*.js', ['js']);
});

gulp.task('dev', ['build', 'watch']);


gulp.task('clean', function() {
  return del('build/*', function(err) {
    console.log('Build files deleted.');
  });
});
