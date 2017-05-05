'use strict';
var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    imageWebpackLoader = require('image-webpack-loader'),
    path = require('path'),
    is_prod = process.env.NODE_ENV === 'production', // true or false
    css_dev = ['style-loader', 'css-loader', 'sass-loader'],
    css_prod = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader'],
      publicPath: '/build'
    }),
    css_config = is_prod ? css_prod : css_dev;

const html_webpack_plugin = new HtmlWebpackPlugin({
  title: 'Webpack boilerplate',
  hash: true,
  template: './source/index.html'
});

const extract_sass = new ExtractTextPlugin({
  filename: 'app.css',
  disable: !is_prod,
  allChunks: true
})

module.exports = {
  entry: {
    app: './source/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: css_config
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]?publicPath=assets/images/&outputPath=assets/images/',
            query: {
              useRelativePath: is_prod
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          }
        ],
        exclude: /node_modules/,
        include: __dirname,
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    hot: true,
    port: 9000
  },
  plugins: [
    html_webpack_plugin,
    extract_sass,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
