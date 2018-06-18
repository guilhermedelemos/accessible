/**
 * Gulpfile.
 *
 * @author Guilherme de Lemos ( https://github.com/guilhermedelemos )
 * @version 1.0.0
 */


/** Plugins **/
var log = require('fancy-log');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var npmDist = require('gulp-npm-dist');
var rename = require('gulp-rename');
var imagemin = require( 'gulp-imagemin' );
var notify   = require( 'gulp-notify' );
var clean = require('gulp-clean');
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');

/** Variables **/
var src  = './src/';
var dist = './dist/';
var distHtml   = dist + 'html/';
var distJekyll = dist + 'jekyll/';
var nodeModules = './node_modules';

/** Scripts **/

/**
 * Task: default
 * Default task for gulp. Send a greeting message.
 */
gulp.task('default', function () {
   gulp.start('greet');
});

/**
 * Task: greet
 * Send a greeting message.
 */
gulp.task('greet', function () {
   console.log('Hello! Try gulp build.');
});

/**
 * Task: build
 * Build the package.
 */
gulp.task('build', ['minify', 'copy:libs', 'optimize:image', 'compile:css']);

/**
 * Task: minify
 * Minify various assets.
 */
gulp.task('minify', ['minify:javascript']);

/**
 * Task: minify:javascript
 * Minify JavaScript code.
 */
gulp.task('minify:javascript', function() {
    return gulp.src([src + 'js/**/*.js'])
      .pipe(uglify())
      //.pipe(gulp.dest('dist/html/js'))
      .pipe(gulp.dest(distHtml + 'js'))
      .pipe( notify( { message: 'DONE: minify JavaScript!', onLast: true } ) );
});

/**
 * Task: copy:libs
 * Source: https://github.com/dshemendiuk/gulp-npm-dist
 * Copy node_modules to the dist folder.
 */
gulp.task('copy:libs', function() {
    gulp.src(npmDist({
        copyUnminified: false,
        excludes: ['/**/*.txt', '/less/', '/scss/', 'core.js']
    }), { base: nodeModules })
    .pipe(rename(function(path) {
        path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
    }))
    .pipe(gulp.dest( distHtml + 'libs'));
});

/**
 * Task: optimize:image
 * Source: https://github.com/sindresorhus/gulp-imagemin
 * Minifies PNG, JPEG, GIF and SVG images.
 */
gulp.task( 'optimize:image', function() {
	gulp.src( src + 'img/**/*.{png,jpg,jpeg,gif,svg}' )
		.pipe( imagemin({
			progressive: true,
			optimizationLevel: 3, // 0-7 low-high
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe( gulp.dest( distHtml + 'img/' ) )
		.pipe( notify( { message: 'DONE: Images Optimized!', onLast: true } ) );
} );

/**
 * Task: clean
 * Source: https://www.npmjs.com/package/gulp-clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
    gulp.src( dist, {read: false})
        .pipe(clean())
        .pipe( notify( { message: 'DONE: dist folder was cleaned!', onLast: true } ) );
});

/**
 * Task: watch
 * Source:
 * Watch modifications and rebuild.
 */
gulp.task('watch', function() {
    //var client = ['scripts'];
    //gulp.watch('src/js/**/*.js', client);
    // Watch JavaScript
    gulp.watch( src + 'js/**/*.js', function(event) {
        gulp.start('minify');
    });
});

/**
 * Task: compile:css
 * Source: https://www.npmjs.com/package/gulp-less
 * Source: https://www.npmjs.com/package/gulp-clean-css
 * Compile LESS to CSS and minify.
 */
gulp.task('compile:css', function () {
  return gulp.src( src + 'less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(distHtml + 'css'))
    .pipe( notify( { message: 'DONE: CSS compiled!', onLast: true } ) );
});
