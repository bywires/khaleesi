var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', 'lib/js', 'lib/css'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    entry: {
        demo: ['./lib/js/demo.jsx'],
        khaleesi: ['./lib/js/components/khaleesi.jsx', './lib/js/stores/khaleesi.jsx', './lib/css/app.less'],
        vendor: ['react']
    },

    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: 'dist/',
        filename: '[name].min.js',
        sourceMapFilename: '[file].map'
    },

    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new webpack.optimize.CommonsChunkPlugin(
            'vendor',
            'vendor.min.js'
        )
    ],

    devtool: 'source-map'
};