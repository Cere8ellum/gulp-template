export const img = () => {
  return app.gulp.src(app.path.src.img)
    // Вывод собщений в Windows, при возникновении ошибок
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Ошибка: <%= error.message %>"
      })
    ))
    // Выгрузка в папку с результатом    
    .pipe(app.gulp.dest(app.path.build.img))
    // Обновление браузера
    .pipe(app.plugins.browsersync.stream());
}