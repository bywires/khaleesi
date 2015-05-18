var gulp = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    del = require('del');

// webpack + gulp reference: https://github.com/webpack/webpack-with-common-libs

function runWebpack(task, configFile, callback) {
    webpack(require(configFile), function(err, stats) {
        if(err) {
            throw new gutil.PluginError(task, err);
        }

        gutil.log('[' + task + ']', stats.toString({
            colors: true
        }));

        callback();
    });
}

gulp.task('webpack:build', function(callback) {
    runWebpack('webpack:build', './webpack/build', callback);
});

gulp.task('dev-server', function(callback) {
    var task = 'dev-server',
        config = require('./webpack/dev-server'),
        host = 'localhost',
        port = 8080;

    var server = new WebpackDevServer(webpack(config), {
        publicPath: '/' + config.output.publicPath,
        stats: {
            colors: true
        }
    });

    server.listen(port, host, function(err) {
        if(err) {
            throw new gutil.PluginError(task, err);
        }

        gutil.log('[' + task + ']', 'http://' + host + ':' + port + '/' + task + '/index.html');
    });
});

gulp.task('webpack:build-dev', function(callback) {
    runWebpack('webpack:build-dev', './webpack/build-dev', callback);
});

gulp.task('clean', function (callback) {
    del(['dist/**/*'], callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'webpack:build', callback);
});

gulp.task('build-dev', function(callback) {
    runSequence('clean', 'webpack:build-dev', callback);
});

gulp.task('watch', ['build-dev'], function() {
    gulp.watch(['lib/**/*'], ['webpack:build-dev']);
});