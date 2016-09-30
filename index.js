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

var connections = [];


app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({extended: false}));


app.post('/', function(req, res){
	var Body = req.body.Body,
			From = req.body.From,
			MediaUrl = req.body.Media,
			message= {
				body: Body,
				from: From,
				img: MediaUrl
			};
	io.emit('message', message);
	res.status(200);
	res.json({
		"message": "Thanx for texting"
	});
});

app.get('/connections', function(req, res){
	res.status(200);
	res.json({
		"connections": connections
	});
});

io.on('connection', function(socket){

	connections.push(socket);

	socket.broadcast.emit('user_connected',{
		id: socket.id.slice(8)
	});

	socket.on('message', function(body){
		console.log('message received');
		socket.broadcast.emit('message', {
			body: body,
			from: socket.id.slice(8)
		});
	});

	socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockects connected', connections.length);
		socket.broadcast.emit('user_disconnected', {
			id: socket.id.slice(8)
		})
  });

});

server.listen(3001);
