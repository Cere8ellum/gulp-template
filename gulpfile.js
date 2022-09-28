// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// передать значения в глобальную переменную
global.app = {
  // Если хранит флаг --build то продакшн
  isBuild: process.argv.includes("--build"),
  // Если хранит флаг --dev то разработчик
  isDev: process.argv.includes("--dev"),
  // Если хранит флаг --control то продакшн без сжатия
  isControl: process.argv.includes("--control"),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Импорт задач
import { assets } from "./gulp/tasks/assets.js";
import { img } from "./gulp/tasks/img.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { zip } from "./gulp/tasks/zip.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.assets, assets);
  gulp.watch(path.watch.img, img);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
}

// Группировка основных задач
// Параллельное выполнение
const mainTasks = gulp.parallel(assets, img, html, scss, js);

// Построение последовательных сценариев выполнения задач
// Сначала удалить все результаты, затем копировать, затем включить наблюдателя
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
// Продакшн
const build = gulp.series(reset, mainTasks);
// Удалить, выполнить основные команды, создать архив
const prodZip = gulp.series(reset, mainTasks, zip);
// Выполнение сценария по-умолчанию
gulp.task("default", dev);

// Экспорт сценариев для доступа извне
export { dev };
export { build };
export { prodZip };