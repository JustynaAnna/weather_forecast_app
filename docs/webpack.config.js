const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: '../docs/script.js', // Ścieżka do twojego pliku script.js
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'output'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    port: 5500
  },
};
