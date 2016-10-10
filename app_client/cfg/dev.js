'use strict';

var path = require('path');
var assign = require('object-assign');
var webpack = require('webpack');
var baseConfig = require('./base');
var defaultConfig = require('./defaults');

var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultConfig.port,
    'webpack/hot/only-dev-server',
    './app_client/src/index'
  ],
  cache: true,
  devtool: 'source-maps',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
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
  exclude:  path.join(__dirname, '/../../npm_modules')
});

module.exports = config;
