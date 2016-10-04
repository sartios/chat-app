'use strict';

var path = require('path');
var assign = require('object-assign');
var webpack = require('webpack');
var baseConfig = require('./base');
var defaultConfig = require('./defaults');

var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = assign({}, baseConfig, {
  entry: [
    './src/index'
  ],
  cache: true,
  devtool: 'source-maps',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultConfig.getDefaultModules()
});

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: '/npm_modules/'
});

module.exports = config;
