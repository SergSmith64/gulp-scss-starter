'use strict';
const gulp = require('gulp');

// TASK: Создаем папку _dest_ и копируем в нее ВСЕ из _src_
gulp.task('default', function () {
    return gulp.src('src/**/*.*')
        // выведем в консоль список того, что будем копировать:
        .on('data', function(file) {
            // ВАРИАНТ-1: вывод всей информации :
            // console.log(file);
            // ВАРИАНТ-2: вывод путей и названий файлов :
            console.log({
                path: file.path,
                dirname: file.dirname,
                basename: file.basename
            });
        })
        // ВАРИАНТ-1: копируем ВСЕ с сохранением папок
        // .pipe(gulp.dest('dest'));

        // ВАРИАНТ-2: копируем но разносим по новым папкам JS и CSS
        .pipe(gulp.dest(function(file) {
            return file.extname == '.js' ? 'dest/js' :
                file.extname == '.css' ? 'dest/css' :
                file.extname == '.svg' ? 'dest/svg' :
                file.extname == '.png' ? 'dest/png' : 'dest'
        }));
});