// Karma configuration
// Generated on Wed Nov 02 2016 11:59:30 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './www/lib/angular/angular.js',
      './www/lib/angular-sanitize/angular-sanitize.js',
      './www/lib/angular-translate/angular-translate.js',
      './www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
      './www/lib/ngCordova/dist/ng-cordova.min.js',
      './www/lib/onsen/js/onsenui.js',
      './www/lib/ntc.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './www/scripts/app.js',
      './www/scripts/directive/themer.js',
      './www/scripts/controllers/colorPickerController.js',
      './www/scripts/controllers/simulatorController.js',
      './www/scripts/controllers/ishihara/ishiharaTestController.js',
      './spec/**/*[sS]pec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
