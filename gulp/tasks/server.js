export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      // Директория рабочих файлов  
      baseDir: `${app.path.build.html}`,
    },
    // Убрать сообщения в браузере (можно изменить на true)
    notify: false,
    port: 3010,
    // Stop the browser from automatically opening
    open: false,
    // After it browser running
    startPath: "/index.html", 
    browser: 'chrome',
    tunnel: true
  });
}
