'use strict';

var path = require('path');
var srcPath = path.join(__dirname, '/../src');
var dfltPort = 3001;

/**
 * Get the default modules object for webpack
 */
 function getDefaultModules(){
   return {
     preLoaders:[
       {
         test: /\.(js|jsx)$/,
         include: srcPath,
         loader: 'eslint-loader'
       }
     ],
     loaders: [
       {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
       },
       {
          test: /\.less/,
          loader: 'style-loader!css-loader!less-loader'
       },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|ttf)/,
        loader: 'file-loader'
      }
     ]
  };
 }

 module.exports = {
   srcPath: srcPath,
   publicPath: '/public/',
   port: dfltPort,
   getDefaultModules: getDefaultModules
 };
