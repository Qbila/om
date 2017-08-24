var Path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: Path.resolve(__dirname, 'client/js/index.js'),
  devtool: 'source-map',
  output: {
    path: Path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.[hash].js'
  },
  resolve : {
    extensions : ['.js', '.jsx', '.json']
  },
  plugins: [
    // Minify JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  }
};
