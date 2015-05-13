var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader?harmony=true'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', 'src/js', 'src/css', 'test/js'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    entry: {
        khaleesi: './src/js/app.jsx'
    },

    output: {
        path: './build',
        filename: 'js/[name].js',
        sourceMapFilename: 'js/[name].map'
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ]
};