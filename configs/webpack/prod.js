require('../utils/load')()

const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('path')
const commonConfig = require('./common')
const Dotenv = require('dotenv-webpack')

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        filename: './js/bundle.[hash].min.js',
        path: resolve(__dirname, '../../dist'),
        publicPath: '/',
    },
    devtool: 'nosources-source-map',
    plugins: [
        new CleanWebpackPlugin(
            'dist', 
            {
                root: resolve(__dirname, '../../')
            }
        ),
        new Dotenv({
			path: resolve(__dirname, '../.env.production'),
		}),
    ],
})
