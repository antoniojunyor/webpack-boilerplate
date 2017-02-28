'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const html_webpack_plugin = new HtmlWebpackPlugin({
  title: 'Webpack boilerplate',
  minify: {
    collapseWhitespace: true
  },
  hash: true,
  template: './source/index.html'
});

const extract_sass = new ExtractTextPlugin({
  filename: 'app.css',
  disable: false,
  allChunks: true
})

module.exports = {
  entry: './source/app.js',
  output: {
    path: 'build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: true
          }
        }, {
          loader: 'sass-loader'
        }],
        publicPath: '/build'
      })
    }]
  },
  devtool: 'source-map',
  plugins: [
    html_webpack_plugin,
    extract_sass
  ]
}
