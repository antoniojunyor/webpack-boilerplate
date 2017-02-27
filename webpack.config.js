var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './source/app.js',
  output: {
    path: 'build',
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack boilerplate',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './source/index.html'
    })
  ]
}
