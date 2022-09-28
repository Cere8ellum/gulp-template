//получить имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

//путь к папке с результатом
const buildFolder = "./dist"; //также можно использовать rootFolder
//путь к папке исходников
const srcFolder = "./src";

//объект для хранения информации о путях
export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    img: `${buildFolder}/img/`,
    assets: `${buildFolder}/assets/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/*.html`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ""
}