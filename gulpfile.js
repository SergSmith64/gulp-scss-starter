const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    // _ можно отключить внешний IP-адрес - тогда не понадобится инет! _
    // online: false
    online: true
  })
}

function scripts() {
  return src([
    'app/js/add.js',
    'app/js/app.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/sass/main.sass')
  .pipe(sass())
  .pipe(concat('app.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(dest('app/css/'))
}

function startwatch() {
  watch(['app/**/*.*', '!app/**/*.min.js'], scripts)
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;

exports.default = parallel(scripts, browsersync, startwatch);
