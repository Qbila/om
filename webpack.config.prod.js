var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'public/js/modules/assess/dass'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  resolve : {
    extensions : ['.js', '.jsx', '.json']
  },
  plugins: [
    // Eliminate duplicate packages when generating bundles
    new webpack.optimize.DedupePlugin(),

    // Minify JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  }
};
