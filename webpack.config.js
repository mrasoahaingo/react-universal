var path = require('path');
var webpack = require('webpack');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};