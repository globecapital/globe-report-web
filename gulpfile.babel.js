
import { series, watch, task } from 'gulp';
import browserSync from "browser-sync";
import { themeInit, pkgFiledest, pkgHtmlEjs } from './gulp-env/theme.vars';

import taskScss from './gulp-env/scss';
import taskpkgImports from './gulp-env/imports';
import taskjavascripts from './gulp-env/scripts';
import taskMedia from './gulp-env/media';
import taskClean from './gulp-env/clean';
import taskcCompress from './gulp-env/compress';
import taskLocalHostSync from './gulp-env/gulp-server';
import taskCompileEjs from './gulp-env/html';
import taskWebFonts from './gulp-env/webfonts';

exports.clean = taskClean; 
exports.googleWebFonts = taskWebFonts;
exports.scss = taskScss;
exports.getsource = taskpkgImports;
exports.js = taskjavascripts;
exports.media = taskMedia;
exports.compress = taskcCompress;
exports.localserver = taskLocalHostSync;
exports.html = taskCompileEjs; 
// exports.favicon = taskgenerateFavicon; 


// craete watch task
const watchTheme = (done) => {
    //console.log(pkgFiledest);
    watch(themeInit.fileRoot.images, series(taskMedia));
    watch(themeInit.fileRoot.scss, series(taskScss));
    watch([themeInit.fileRoot.js], series(taskjavascripts));
    watch(pkgHtmlEjs.templates, series(taskCompileEjs));
    watch([
        pkgFiledest.images + '/images/**/*.{png,jpg,jpeg,gif,webp,ico,svg}',
        pkgFiledest.js + '/js/**/*.js',
        pkgFiledest.css + '/**/*.css',
        pkgFiledest.html + '/**/*.html'
    ]).on('change', browserSync.reload);
    done();
};
exports.watch = series(watchTheme);

task('webfont', series(taskWebFonts));

task('init', series(taskClean, taskWebFonts , taskScss, taskjavascripts, taskpkgImports, taskMedia, taskCompileEjs));

task('dev', series('init', taskLocalHostSync, watchTheme));
task('monitor', series(taskLocalHostSync, watchTheme));