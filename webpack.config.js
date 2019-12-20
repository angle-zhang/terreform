const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, 
      { 
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false
      }
    },
    publicPath: 'http://localhost:3000/public/',
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new dotenv()]
};
