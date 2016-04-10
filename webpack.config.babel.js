import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';

const banner = pkg.name + ' v' + pkg.version + ' | (c) ' + new Date().getFullYear() + ' ' + pkg.author + ' | ' + pkg.license + ' | ' + pkg.homepage;
const env = process.env.BUILD_ENV;
let plugins = [
    new webpack.BannerPlugin(banner)
];

if (env === 'dist') {
    plugins = plugins.concat([
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]);
}

export default {
    entry: path.resolve(__dirname, 'lib/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: env === 'dist' ? 'react-infinite-tree.min.js' : 'react-infinite-tree.js',
        libraryTarget: 'commonjs',
        library: 'InfiniteTree'
    },
    plugins: plugins,
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
