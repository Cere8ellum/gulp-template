import webpack from "webpack-stream";
import rename from "gulp-rename";

export const js = () => {
  /* 
  * sourcemaps нужен для того, чтобы видеть в собранном из исходников файле, 
  * из какого исходника(файла)
  * взят тот или иной кусок стилей
  * Использовать только в dev
  * Если нужно всегда - заменить на sourcemaps: true
  */
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    // Вывод собщений в Windows, при возникновении ошибок
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Ошибка: <%= error.message %>"
      })
    ))
    /*
    * Использование webpack
    * Для сборки из модулей в синтаксисе ES6
    */
    .pipe(
      app.plugins.if(
        // Если не на проверку
        !app.isControl,
        webpack({
          // Режим dev или prod в зависимости от isBuild
          mode: app.isBuild ? "production" : "development",
          // Файл результата (указан в html файлах)
          // output: {
          //   filename: "app.min.js"
          // }
        }),
      ))
    // Переименование получаемого файла
    .pipe(rename({
      extname: ".min.js"
    }))
    // Выгрузка в папку с результатом    
    .pipe(app.gulp.dest(app.path.build.js))
    // Обновление браузера
    .pipe(app.plugins.browsersync.stream());
}