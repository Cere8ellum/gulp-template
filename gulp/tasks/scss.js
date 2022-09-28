import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // Сжатие CSS файла
import autoprefixer from "gulp-autoprefixer" // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа-запросов

// Вызов плагина gulpSass, с передачей в него компилятора sass
const sass = gulpSass(dartSass);

export const scss = () => {
  /* 
  * sourcemaps нужен для того, чтобы видеть в собранном из исходников файле, 
  * из какого исходника(файла)
  * взят тот или иной кусок стилей
  * Использовать только в dev
  * Если нужно всегда - заменить на sourcemaps: true
  */
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    // Вывод собщений в Windows, при возникновении ошибок
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Ошибка: <%= error.message %>"
      })
    ))
    // Замена "@img" на "/img"
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    // 
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    // Группировка медиа-запросов
    .pipe(groupCssMediaQueries())
    /*
    * Добавление префиксов для кроссбраузерных свойств
    * Но только в режиме продакшн
    */
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          // Поддержка grid свойств
          grid: true,
          // Количество версий браузера, от последней к предыдущим
          overrideBrowsersList: ["last 3 versions"],
          // Авто-табуляция для красоты
          cascade: true
        })
      )
    )
    // Перемещение в папку с результатами
    .pipe(app.gulp.dest(app.path.build.css))
    /* 
    * Сжатие итогового css файла
    * Закомментировать, если нужен оригинальный (не сжатый) файл css
    * Но только в режиме продакшн
    */
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    // Переименование получаемого css файла
    .pipe(rename({
      extname: ".min.css"
    }))
    // Выгрузка в папку с результатом    
    .pipe(app.gulp.dest(app.path.build.css))
    // Обновление браузера
    .pipe(app.plugins.browsersync.stream());
}