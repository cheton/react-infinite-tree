const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

const banner = pkg.name + ' v' + pkg.version + ' | (c) ' + new Date().getFullYear() + ' ' + pkg.author + ' | ' + pkg.license + ' | ' + pkg.homepage;
const env = process.env.BUILD_ENV;

module.exports = {
    mode: 'development',
    target: 'web',
    entry: path.resolve(__dirname, 'lib/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: env === 'dist' ? 'react-infinite-tree.min.js' : 'react-infinite-tree.js',
        libraryTarget: 'commonjs',
        library: 'InfiniteTree'
    },
    optimization: {
        minimizer: [
            (env === 'dist') && (
                new TerserPlugin()
            ),
        ].filter(Boolean)
    },
    plugins: [
        new webpack.BannerPlugin(banner),
    ],
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'infinite-tree': {
            root: 'InfiniteTree',
            commonjs2: 'infinite-tree',
            commonjs: 'infinite-tree',
            amd: 'infinite-tree'
        }
    }
};
