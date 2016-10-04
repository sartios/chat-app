'use strict';

var path = require('path');
var assign = require('object-assign');
var webpack = require('webpack');
var baseConfig = require('./base');
var defaultConfig = require('./defaults');

var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = assign({}, baseConfig, {
  entry: [
     'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/index'
  ],
  cache: true,
  devtool: 'source-maps',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '/../src'),
  exclude:  path.join(__dirname, '/../npm_modules')
});

module.exports = config;
