export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      // Директория рабочих файлов  
      baseDir: `${app.path.build.html}`,
    },
    // Убрать сообщения в браузере (можно изменить на true)
    notify: false,
    // Порт локального сервера
    port: 3000,
  });
}