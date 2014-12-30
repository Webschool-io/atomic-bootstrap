var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    notify     = require('gulp-notify'),
    plumber    = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    preprocess = require('gulp-preprocess');

var target = {
    jade_src  : 'index.html',
    html_dest : 'test/',

    sass_src  : 'assets/scss/**/*.scss',
    css_dest  : 'test/css'
}

gulp.task('dev-jade', function() {
  gulp.src(target.jade_src)
    .pipe(plumber())
    .pipe(preprocess({context: { NODE_ENV: 'development', DEBUG: true}}))
    .pipe(gulp.dest(target.html_dest))
    .pipe(notify({message: 'Development Jade'}));
});

gulp.task('dev-sass', function() {
  gulp.src(target.sass_src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target.css_dest))
    .pipe(notify({message: 'Development Sass'}));
});

gulp.task('browser-sync', function() {
    browserSync.init(["test/css/*.css"], {
        server: {
            baseDir: "test/"
        }
    });
});

gulp.task('development', function() {
    gulp.run('dev-sass', 'dev-jade', 'browser-sync')

    gulp.watch(target.sass_src, function() {
        gulp.run('dev-sass');
    });
})