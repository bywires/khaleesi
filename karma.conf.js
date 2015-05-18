var webpackConfig = require('./webpack/karma');

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'karma-preprocessor.js' , watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma-preprocessor.js': ['webpack']
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};