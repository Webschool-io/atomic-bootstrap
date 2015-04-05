var gulp       = require('gulp');
var sass       = require('gulp-sass');
var plumber    = require('gulp-plumber');
var notify    = require('gulp-notify');

var target = {
  sass_src  : 'assets/scss/**/*.scss',
  css_dest  : 'dist/css'
}

gulp.task('dev-sass', function() {
  gulp.src(target.sass_src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(target.css_dest))
    .pipe(notify({message: 'Development Sass'}));
});

gulp.task('development', function() {
  gulp.run('dev-sass')

  gulp.watch(target.sass_src, function() {
    gulp.run('dev-sass');
  });
})