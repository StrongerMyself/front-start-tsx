require('../utils/load')()

const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./common')
const { resolve } = require('path')
const Dotenv = require('dotenv-webpack')
const TSLintPlugin = require('tslint-webpack-plugin')

const port = process.env.PORT || 8000

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new TSLintPlugin({ files: ['./src/**/*.ts*'], waitForLinting: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new Dotenv({
			path: resolve(__dirname, '../.env'),
		}),
    ],
    devServer: {
        publicPath: '/',
        contentBase: resolve(__dirname, '../../public'),
        historyApiFallback: true,
        hot: true,
        port: port,
        open: true
    },
})
