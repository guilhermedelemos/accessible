//https://www.smashingmagazine.com/2014/06/building-with-gulp/
var log = require('fancy-log');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var npmDist = require('gulp-npm-dist');
var rename = require('gulp-rename');

gulp.task('default', function () {
   gulp.start('greet');
});
gulp.task('greet', function () {
   console.log('Hello! Try gulp build.');
});
gulp.task('build', ['minify', 'copy:libs']);
gulp.task('minify', function() {
    log('Minify');
    return gulp.src(['src/js/**/*.js'])
      .pipe(uglify())
      .pipe(gulp.dest('dist/html/js'));
});
gulp.task('watch', function() {
    //var client = ['scripts'];
    //gulp.watch('src/js/**/*.js', client);
    gulp.watch('src/js/**/*.js', function(event) {
        log('File '+event.path+' was '+event.type+', running tasks...');
        gulp.start('minify');
    });
});
// Copy dependencies to ./public/libs/
gulp.task('copy:libs', function() {
    gulp.src(npmDist({
        copyUnminified: false,
        excludes: ['/**/*.txt', '/less/', '/scss/', 'core.js']
    }), { base: './node_modules' })
    .pipe(rename(function(path) {
        path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
    }))
    .pipe(gulp.dest('./dist/html/libs'));
});
