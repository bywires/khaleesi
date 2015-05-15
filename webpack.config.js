var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', 'lib/js', 'lib/css', 'spec'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    entry: {
        khaleesi: ['./lib/js/app.jsx', './lib/css/app.less'],
        spec: './spec/app_spec.jsx'
    },

    output: {
        path: './dist',
        filename: '[name].min.js',
        sourceMapFilename: '[file].map'
    },

    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    ],

    devtool: 'source-map'
};