const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    // _ отключаю внешний IP-адрес - нам не понадобится инет! _
    online: false
  })
}

function scripts() {
  return src([
    'app/js/add.js',
    'app/js/app.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(dest('app/js'))
}

exports.browsersync = browsersync;
exports.scripts = scripts;
