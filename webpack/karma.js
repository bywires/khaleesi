var config = require('./base');

config.watch = true;

config.module.loaders = [{
    test: /\.jsx$/,
    loader: 'babel-loader?cacheDirectory',
    exclude: /node_modules/
}];

config.entry = {
    khaleesi: ['./lib/js/components/khaleesi.jsx', './lib/js/stores/khaleesi.jsx']
};

config.plugins = [];

module.exports = config;