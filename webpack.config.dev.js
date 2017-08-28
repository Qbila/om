const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: Path.resolve(__dirname, 'client/js/index.js'),
    vendor: Path.resolve(__dirname, 'client/js/vendor.js')
  },
  devtool: 'source-map',
  output: {
    path: Path.resolve(__dirname, 'public/dist'),
    filename: '[name].[hash].js'
  },
  resolve : {
    extensions : ['.js', '.jsx', '.json']
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new HtmlWebpackPlugin({
      template: 'client/views/layouts/webpackTemplate/layout.html',
      filename: 'layout.html',
      inject: 'body',
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: false,
        removeStyleLinkTypeAttributes: false,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      }) }
    ]
  }
};
