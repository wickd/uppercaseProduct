// Dependencies
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let livereload = require('gulp-livereload');
let clear = require('clear');
let apidoc = require('gulp-apidoc');
let cleanCss = require('gulp-clean-css');
let sass = require('gulp-sass');
let imagemin = require('gulp-imagemin');
let directoriesHelper = require('./helpers/directories');
let config = require('config');

//supress config warning

// index
let script = 'index.js';

for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] == '--environment') {
        if (process.argv[i + 1] == 'pro') {
            process.env.NODE_ENV = 'live';
            process.env.NODE_CONFIG_DIR = './config'
        }
        else if (process.argv[i + 1] == 'test') {
            process.env.NODE_ENV = 'test';
            process.env.NODE_CONFIG_DIR = './config'
        }
        else {
            process.env.NODE_ENV = 'localhost';
            process.env.NODE_CONFIG_DIR = './config'
        }
    }
}

/**
 * livereload
 */
let server = function () {
    return gulp.src(script).pipe(livereload());
};

/**
 * nodemon
 */
let nodemonjs = function () {
    return nodemon({
        script: script,
        ignore: 'public/*'
    }).on('restart', function () {
        clear();
        sass();
        sassWatch();
        // apidocjs();
        server();
    });
};

/**
 * sass
 */
let sassLoad = function () {

    let modules = directoriesHelper.getDirectories('./app/frontend');
    for (var i = 0; i < modules.length; i++) {
        gulp.src(`./app/frontend/${modules[i]}/views/sass/*.scss`)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(cleanCss())
            .pipe(gulp.dest(`./public/frontend/${modules[i]}/css`));
    }

    // return gulp.src('./app/frontend/common/sass/*.scss')
    //     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //     .pipe(cleanCss())
    //     .pipe(gulp.dest('./public/app/common/css'));

};

let sassWatch = function () {
    let modules = directoriesHelper.getDirectories('./app/frontend');
    for (var i = 0; i < modules.length; i++) {
        gulp.watch(`./app/frontend/${modules[i]}/views/sass/*.scss`, ['sass']);

    }

    // gulp.watch('./app/frontend/common/sass/*.scss', ['sass']);
};

/**
 * minImg
 */

let minImg = function () {
    let modules = directoriesHelper.getDirectories('./app/frontend');
    for (let i = 0; i < modules.length; i++) {
        gulp.src(`./app/frontend/${modules[i]}/views/img/**/*`)
            .pipe(imagemin())
            .pipe(gulp.dest(`./public/frontend/${modules[i]}/img`));
    }
    // gulp.src('./app/frontend/common/img/**/*')
    //     .pipe(imagemin())
    //     .pipe(gulp.dest('./public/app/common/img/'))
};

// Task-------------------------
gulp.task('default', ['nodemon', 'sass', 'sass:watch']);
// gulp.task('apidoc', apidocjs);
gulp.task('nodemon', nodemonjs);
// gulp.task('minImg', minImg);
// gulp.task('sass:watch', sassWatch);
// gulp.task('sass', sassLoad);