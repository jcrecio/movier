module.exports = function (config) {

    var destinationDir = './release/';

    config.set({
        basePath: '',

        files: [
            'release/app/vendor.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'app/index.js',
            'app/**/*.js',
            'spec/**/*.js',
        ],
        reporters: ['mocha', 'coverage', 'junit'],
        preprocessors: {
            'app/**/*.js': ['coverage'],
            'app/**/*.html': ['ng-html2js'],
            'app/**/*.cshtml': ['ng-html2js']
        },

        coverageReporter: {
            type: 'html',
            dir: destinationDir + 'coverage/'
        },
        junitReporter: {
            outputDir: destinationDir,
            outputFile: undefined,
            suite: ''
        },
        debug: true,
        exclude: [
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },
        //browserNoActivityTimeout: 800000,
        plugins: [
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-ie-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-ng-html2js-preprocessor',
            'karma-mocha-reporter'
        ]
    });
}