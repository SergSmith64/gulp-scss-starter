const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

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
}
function startwatch() {
  watch(['app/**/*.*', '!app/**/*.min.js'], scripts)
}

exports.browsersync = browsersync;
exports.scripts = scripts;

exports.default = parallel(scripts, browsersync, startwatch);
