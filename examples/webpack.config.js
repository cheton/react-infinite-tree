const path = require('path');
const webpack = require('webpack');
const babelConfig = require('../babel.config');

module.exports = {
    mode: 'production',
    target: 'web',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, '../docs'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: babelConfig,
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader?camelCase&modules&importLoaders=1&localIdentName=[local]---[hash:base64:5]',
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    // https://webpack.github.io/docs/webpack-dev-server.html#additional-configuration-options
    devServer: {
        disableHostCheck: true,
        noInfo: false,
        lazy: false,
        // https://webpack.github.io/docs/node.js-api.html#compiler
        watchOptions: {
            poll: true // use polling instead of native watchers
        }
    }
};
