const gulp           = require('gulp'),
		gutil          = require('gulp-util' ),       //это вспомогательный модуль
		sass           = require('gulp-sass'),        //SASS
		browserSync    = require('browser-sync'),     //Синхронизация проекта и браузера
		concat         = require('gulp-concat'),      //объеденяет JS файлы в один
		uglify         = require('gulp-uglify'),      //Минимизировать JS
		cleanCSS       = require('gulp-clean-css'),   //Минимизировать CSS (CSSO)
		rename         = require('gulp-rename'),      //из some.js в some.min.js
		del            = require('del'),              //Delete files and folders
		imagemin       = require('gulp-imagemin'),    //Сжимать картинки форматов PNG, JPEG, GIF и SVG
		cache          = require('gulp-cache'),       //Kэширование изображений, прошедших через imagemin
		autoprefixer   = require('gulp-autoprefixer'),//Автопрефиксер
		ftp            = require('vinyl-ftp'),        //Соединяемся по ftp и закидываем нужные файлы
		notify         = require("gulp-notify"),      //Bыводит ошибки при сборке Gulp в виде системных сообщений
		svgstore       = require('gulp-svgstore'),     //бъединяет все подключаемые SVG файлы и записывает их в HTML как <symbol> для дальнейшего использования.
		rsync          = require('gulp-rsync');
const gcmq = require('gulp-group-css-media-queries'); //Группирует разбросанные @media 
const sourcemaps = require('gulp-sourcemaps');        //Показывает в отладчике реальные номера строк.


// Пользовательские скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js'
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.min.js' // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/style.scss')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
  .pipe(gcmq())
  .pipe(sourcemaps.init())
	.pipe(gulp.dest('app/css'))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 2 versions']))
	.pipe(cleanCSS({level: 2})) // Опционально, закомментировать при отладке
  .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task("sprite", function () {
  return gulp.src("app/img/*-icon.svg")
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("app/img"));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/**/*.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	let buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess'
		]).pipe(gulp.dest('dist'));

	let buildCss = gulp.src([
		'app/css/style.css',
		'app/css/style.min.css'
		]).pipe(gulp.dest('dist/css'));

	let buildJs = gulp.src([
		'app/js/scripts.min.js'
		]).pipe(gulp.dest('dist/js'));

	let buildFonts = gulp.src([
		'app/fonts/!**/!*'
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	let conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	let globs = [
	'dist/**',
	'dist/.htaccess'
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
