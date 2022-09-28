import fileInclude from "gulp-file-include";
import versionNumber from "gulp-version-number";

export const html = () => {
  return app.gulp.src(app.path.src.html)
    // Вывод собщений в Windows, при возникновении ошибок
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Ошибка: <%= error.message %>"
      })
    ))
    // Сборка из файлов в папке html
    .pipe(fileInclude())
    // Замена "@img" на "/img"
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    /* 
    * Добавление ключа для запрета кеширования файлов в браузере
    * Для css и js
    * Но только в режиме разработчика или контроля
    */
    .pipe(
      app.plugins.if(
        app.isDev || app.isControl,
        versionNumber({
          'value': '%DT%',
          'append': {
            'key': '_v',
            'cover': 0,
            'to': [
              'css',
              'js',
            ]
          },
          'output': {
            'file': 'gulp/version.json'
          }
        })
      )
    )
    // Перемещение в папку с результатами
    .pipe(app.gulp.dest(app.path.build.html))
    // Обновление браузера
    .pipe(app.plugins.browsersync.stream());
}