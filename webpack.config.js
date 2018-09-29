'use strict'

const path = require('path');
const webpack = require('webpack');

const BabiliWebpackPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

let config = {
    entry: {
        main: path.join(__dirname, 'src/main.ts'),
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader",
            }, {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.node$/,
                use: 'node-loader',
            }
        ]
    },
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json', '.node'],
    },
    target: 'node',
    externals: [],
}

module.exports = function(env, argv) {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(argv.mode),
        })
    );
    if (argv.mode === 'production') {
        config.plugins.push(
            new webpack.DefinePlugin({
                '__static': './static',
            }),
            new CleanWebpackPlugin(['./dist']),
            new BabiliWebpackPlugin(),
        );
    } else {
        config.plugins.push(
            new webpack.DefinePlugin({
                '__static': path.join(__dirname, 'static').replace(/\\/g, '\\\\'),
            }),
            new webpack.BannerPlugin({
                raw: true,
                entryOnly: false,
                banner: 'require("source-map-support").install();',
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new StartServerPlugin({
                name: 'main.js',
                once: true,
                nodeArgs: ['--inspect']
            }),
        );
        config.externals.push(new NodeExternals({
            whitelist: ['webpack/hot/poll?1000'],
        }));
        config.entry = ["webpack/hot/poll?1000", config.entry.main];
        config.devtool = 'source-map';
    }
    return config;
};