var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var Server = require('karma').Server;
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');
var notProvided = 'not provided';
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var refresh = require('gulp-refresh');

var _destinationDir = './release/';

function run(){
    runSequence(
        'cleanBuild',
        'bundle',
        'compileTS',
        'compileTSTests',
        'moveFilesToDestination',
        'executeKarma');
}
gulp.task('default', function () {
    run();
});

gulp.task('cleanBuild', function () {
    del('./app/*.js');
    del('./app/*.map');
    del('./app/**/*.js');
    del('./app/**/*.map');
    del('./spec/app/*.js');
    del('./spec/app/**/*.js');
    del('./spec/mocks/*.map');
    del('./spec/mocks/*.js');

    return del(
            [_destinationDir+ '*', '!' + _destinationDir + 'bin']
        );
});

gulp.task('compileTS', function () {
    return compileTS();
});

function compileTS() {
    var dir = './';

    var tsResult = gulp.src([dir + 'app/*.ts',
                             dir + 'app/**/*.ts',
                             dir + 'typings/**/*.ts'])
        .pipe($.sourcemaps.init()) 
        .pipe($.typescript(tsProject))
        .pipe($.sourcemaps.write('.', { includeContent: false, sourceRoot: '/app/' })) 
        .pipe(gulp.dest('./app'));

    return tsResult;
}

gulp.task('compileTSTests', function () {
    return compileTSTests();
});

function compileTSTests() {
    var dir = './';

    var tsResult = gulp.src([dir + 'spec/*.ts',
                             dir + 'spec/**/*.ts',
                             dir + 'typings/**/*.ts'])
        .pipe($.sourcemaps.init()) 
        .pipe($.typescript(tsProject))
        .pipe($.sourcemaps.write('.', { includeContent: false, sourceRoot: '/spec/' })) 
        .pipe(gulp.dest('./spec'));

    return tsResult;
}

gulp.task('bundle', function () {
    return bundle(_destinationDir);
});

function bundle(destinationDir) {
    gulp.src(getVendorFiles())
        .pipe($.newer('release/app/vendor.js'))
        .pipe($.concat('release/app/vendor.js'))
        .pipe(gulp.dest('./'))
        .pipe(refresh());
}

gulp.task('moveFilesToDestination', function(){
    var files = [
            'app/*.js',
            'app/*.ts',
            'app/*.css',
            'app/**/*.js',
            'app/**/*.ts',
            'app/**/*.css',
            'app/**/*.map',
            'app/**/*.html',
            'app/**/*.cshtml',
            'app/sass/main.css',
            'Fonts/**/*.woff',
            'Fonts/**/*.woff2',
            'Fonts/**/*.ttf',
            'img/*.*',
            'img/**/*.*'
        ];

     return gulp.src(files)
                .pipe($.copy('release'));
});

function getVendorFiles() {
    return [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular/dist/angular-cache.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap/dist/fonts/*.*',
        'bootstrap/dist/js/bootstrap.js'
    ];
}

function getAppFiles(){
    return [
        'app/**/*.js'
    ];
}

function getTestFiles(){
    return [
        'spec/**/*.js'
    ];
}

gulp.task('executeKarma', function (done) {
    try {
        new Server(
            {
                configFile: __dirname + '/karma.conf.js',
                singleRun: true
            }, done).start();
    } catch (ex) {
        logger.log(ex);
    }
});

gulp.task('watch', function () {
    refresh.listen();
    gulp.watch(['app/**/*.ts'], run);
    gulp.watch(['app/*.ts'], run);
    gulp.watch('app/*.css', run);
    gulp.watch(['spec/**/*.ts'], run);
    gulp.watch(['spec/*.ts'], run);
    gulp.watch('app/**/*.css', run);
    gulp.watch('app/**/*.scss', run);
    gulp.watch('app/**/*.html', run);
    gulp.watch('app/*.html', run);
    gulp.watch('app/**/*.cshtml', run);
    gulp.watch('app/*.cshtml', run);
});

var tsProject = $.typescript.createProject({
    declarationFiles: true,
    noExternalResolve: true,
    sortOutput: true,
    experimentalDecorators: true,
    target: 'ES5'
});



