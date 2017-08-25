const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new HtmlWebpackPlugin({
      template: 'client/views/layouts/webpackTemplate/layout.html',
      filename: 'layout.html',
      inject: 'body'
    }),

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
