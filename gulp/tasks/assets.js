export const assets = () => {
  return app.gulp.src(app.path.src.assets)
    // Вывод собщений в Windows, при возникновении ошибок
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "ASSETS",
        message: "Ошибка: <%= error.message %>"
      })
    ))
    // Выгрузка в папку с результатом    
    .pipe(app.gulp.dest(app.path.build.assets))
    // Обновление браузера
    .pipe(app.plugins.browsersync.stream());
}