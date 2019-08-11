const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcssConfig = require('./postcss')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log(__dirname)

module.exports = {
    resolve: {
        alias: {
            src: resolve(__dirname, '../../src/')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'sass', 'scss'],
    },
    context: resolve(__dirname, '../../'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    { loader: 'css-loader', options: { sourceMap: true } },
                    postcssConfig
                ],
            },
            {
                test: /\.(scss|sass)$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true } },
                    postcssConfig,
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/'
					}
				}]
			},
            {
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/fonts/'
					}
				}]
			},
        ],
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: resolve(__dirname, '../../public/'),
            to: resolve(__dirname, '../../dist'),
        }]),
        new MiniCssExtractPlugin({filename: './css/[name].[hash].css'}),
    ],
    performance: {
        hints: false,
    },
}
