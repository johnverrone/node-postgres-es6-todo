var gulp = require('gulp');
var util = require('gulp-util');
var elm = require('gulp-elm');
var runSequence = require('run-sequence');

gulp.task('elm-init', elm.init);

gulp.task('elm', ['elm-init'], function() {
    return gulp.src('public/src/*.elm')
        .pipe(elm())
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('copy-html', function() {
    return gulp.src('public/src/*.html')
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('build', function() {
    runSequence('elm', 'copy-html');
})

gulp.task('test', function() {
    // Run tests
    return;
})

gulp.task('default', ['build']);
