var gulp = require('gulp');
var util = require('gulp-util');
var tsc = require('gulp-typescript');
var runSequence = require('run-sequence');

gulp.task('compile-ts', ['compile-server']);

gulp.task('compile-server', function() {
    return gulp.src(['./**/*.ts', '!./node_modules/**', '!./public/**/'])
        .pipe(tsc({
            module: "commonjs",
            target: "ES5"
        }))
        .on('error', util.log)
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(['./**/*.ts'], function() {
        runSequence('compile-ts');
    });
});

gulp.task('default', function() {
    runSequence('compile-ts', 'watch');
});
