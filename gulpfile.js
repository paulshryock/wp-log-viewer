// Dependencies
var $			= require('gulp-load-plugins')();
var Gulp		= require('gulp');
var Jeet		= require('Jeet');


// Paths
var paths = {
	src: {
		css: 'src/css/**/*.styl',
		img: 'src/img/**/*',
		js: [
			'src/bower/react/react.min.js',
			'src/bower/reqwest/reqwest.min.js',
			'src/bower/blueimp-md5/js/md5.min.js',
			'src/bower/humane/humane.min.js',
			'src/react/**/*.jsx',
			'src/js/main.jsx'
		]
	},
	
	build: {
		css: 'assets/css',
		img: 'assets/img',
		js: 'assets/js'
	}
};


/**
 * Check if is jsx file
 * @param {object} Vinyl file object
 * @return {boolean}
 */
function isJSX(file) {
	var ext = '.jsx';
	var startIndex = file.path.length - ext.length;
	
	return file.path.indexOf(ext, startIndex) !== -1 ? true : false;
}


// Default Task
Gulp.task('default', ['css', 'images', 'js']);


// Watch 
Gulp.task('watch', function() {
	Gulp.watch(paths.src.css, ['css']);
	Gulp.watch(paths.src.img, ['images']);
	Gulp.watch(paths.src.js, ['js']);
});


// Process all stylus files
Gulp.task('css', function() {
	return Gulp.src(paths.src.css)
		.pipe($.plumber())
		.pipe($.stylus({
			use: [Jeet()]
		}))
		.pipe($.minifyCss())
		.pipe($.autoprefixer())
		.pipe($.rename('main.min.css'))
		.pipe(Gulp.dest(paths.build.css));
});


// Process all image files
Gulp.task('images', function() {
	return Gulp.src(paths.src.img)
		.pipe($.plumber())
		.pipe(Gulp.dest(paths.build.img));
});


// Process all javascript files
Gulp.task('js', function() {
	return Gulp.src(paths.src.js)
		.pipe($.plumber())
		.pipe($.if(isJSX, $.react()))
		.pipe($.concat('main.min.js'))
		.pipe(Gulp.dest(paths.build.js));
});
