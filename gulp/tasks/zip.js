import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
    // Удалить архив, если существует
    del(`./${app.path.rootFolder}.zip`);
    // Получить все файлы из папки с результатом
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        // Вывод собщений в Windows, при возникновении ошибок
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "ZIP",
                message: "Ошибка: <%= error.message %>"
            })
        ))
        /* 
        * Создать архив с проектом, дав ему название 
        * rootFolder (папка, в которой сейчас лежат все файлы)
        */
        .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
        // Выгрузить архив в корень папки проекта
        .pipe(app.gulp.dest("./"));
}