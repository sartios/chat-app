'use strict';
var path = require('path');
var defaultSettings = require('./defaults');

module.exports = {
  port: defaultSettings.port,
  debug: true,
  devtool: 'source-maps',
  output:{
    path: path.join(__dirname, '/../src/dist/assets'),
    filename: 'bundle.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './app_client/src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: '${defaultSettings.srcPath}/actions/',
      components: '${defaultSettings.srcPath}/components/',
      stores: '${defaultSettings.srcPath}/stores/',
      styles: '${defaultSettings.srcPath}/styles/'
    }
  },
  module: {}
};
