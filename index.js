var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var server = http.createServer(app);
var socketIO = require('./app_server/sockets/chat-sockets')(server);

var io = socketIO.io;

app.use(cors({
	origin: 'http://localhost:3000'
}));

app.use(express.static(__dirname + '/public'));
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
	var connections = socketIO.connections;
	var users = JSON.stringify(connections.map(function(socket){
		return socket.id.slice(8);
	}));
	res.json({
		"connections": users
	});
});

server.listen(8000, function(err){
	if(err){
		console.log(err);
	}
	console.log('Listening at localhost:8000');
});
