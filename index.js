var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({extended: false}));

server.listen(3000);