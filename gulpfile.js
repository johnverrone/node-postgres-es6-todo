var gulp = require('gulp');
var util = require('gulp-util');
var tsc = require('gulp-typescript');
var runSequence = require('run-sequence');

gulp.task('compile-ts', ['compile-server', 'compile-client']);

gulp.task('compile-server', function() {
    return gulp.src(['./**/*.ts', '!./node_modules/**', '!./public/**/'])
        .pipe(tsc({
            module: "commonjs",
            target: "ES5"
        }))
        .on('error', util.log)
        .pipe(gulp.dest('./'));
});

gulp.task('compile-client', function() {
    return gulp.src(['./public/**/*.ts'])
        .pipe(tsc({
            module: "amd",
            target: "ES5"
        }))
        .on('error', util.log)
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
    gulp.watch(['./**/*.ts', './**/*.tsx'], function() {
        runSequence('compile-ts');
    });
});

gulp.task('default', function() {
    runSequence('compile-ts', 'watch');
});

gulp.task('test', function() {
    // run unit test via karma
    return;
});