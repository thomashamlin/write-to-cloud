/* jshint node:true */

'use strict';

var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


/* Tasks */

// Project resources

// Concatenate and parse LESS files
gulp.task('css', function() {
  return gulp.src('less/*.less')
    .pipe(concat('writetocloud.css'))
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

// Concatenate and minify JavaScript files
gulp.task('js', function() {
  // Order matters here: wtc.js sets the namespace and core definitions
  return gulp.src(['js/wtc.js', 'js/*.js'])
    .pipe(concat('writetocloud.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('writetocloud.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function() {
  return gulp.src('html/*')
    .pipe(gulp.dest('build'));
});


// External resources

gulp.task('bower_js', function() {
  // this gathers too many files but is easier to maintain during rapid dev
  return gulp.src('bower_components/**/*.{js,min.js,min.js.map}')
    .pipe(flatten())
    .pipe(gulp.dest('build/js'));
});

gulp.task('bower_css', function() {
  return gulp.src('bower_components/medium.js/medium.css')
    .pipe(gulp.dest('build/css'));
});


// High level tasks

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
