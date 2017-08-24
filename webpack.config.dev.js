var Path = require('path');

console.log(Path.resolve(__dirname, 'public/dist'));

module.exports = {
  entry: Path.resolve(__dirname, 'client/js/index.js'),
  devtool: 'inline-source-map',
  output: {
    path: Path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.[hash].js'
  },
  resolve : {
    extensions : ['.js', '.jsx', '.json']
  },
  plugins: [],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  }
};
