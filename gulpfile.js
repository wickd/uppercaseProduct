// Dependencies
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let livereload = require('gulp-livereload');
let clear = require('clear');
let apidoc = require('gulp-apidoc');
let cleanCss = require('gulp-clean-css');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let imagemin = require('gulp-imagemin');
let directoriesHelper = require('./helpers/directories');
let config = require('config');
let pm2 = require('pm2');

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
        server();
    });
};

/**
 * js
 */

gulp.task('js', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/modernizr/bin/modernizr.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/chosen-js/chosen.jquery.js',
        'node_modules/dropzone/dist/dropzone.js',
        'public/assets/main.js',
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch', ['js'], function () {
    gulp.watch('public/assets/js/*.js', ['js']);
});

/**
 * sass
 */
let sassLoad = function () {
    gulp.src(`./public/assets/sass/*.scss`)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(gulp.dest(`./public/assets/css`));
};

let sassWatch = function () {
    // let modules = directoriesHelper.getDirectories('./app/frontend');
    // for (var i = 0; i < modules.length; i++) {
    gulp.watch(`./public/assets/sass/*.scss`, ['sass']);

    // }

    // gulp.watch('./app/frontend/common/sass/*.scss', ['sass']);
};

/**
 * minImg
 */

let minImg = function () {
    // let modules = directoriesHelper.getDirectories('./app/frontend');
    // for (let i = 0; i < modules.length; i++) {
    gulp.src(`./public/assets/img/**/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`./public/assets/img`));
    // }
    // gulp.src('./app/frontend/common/img/**/*')
    //     .pipe(imagemin())
    //     .pipe(gulp.dest('./public/app/common/img/'))
};

let pm2Serve = () => {
    pm2.connect(true, () => {
        pm2.start({
            name: 'sarco_dev',
            script: 'index.js',
            watch:true,
            args :['--trace-warnings'],
            env: {
                NODE_ENV: "production",
                NODE_CONFIG_DIR : './config'
            },

        }, () => {
            console.log('pm2 started');
            pm2.streamLogs('all', 0);
        });
    });
}

// Task-------------------------
gulp.task('default', ['nodemon', 'sass', 'sass:watch', 'watch']);
gulp.task('production', pm2Serve);
// gulp.task('apidoc', apidocjs);
gulp.task('nodemon', nodemonjs);
gulp.task('minImg', minImg);
gulp.task('sass:watch', sassWatch);
gulp.task('sass', sassLoad);