var socketIO = require('socket.io');

var chatSockets = function(server){
	var io = socketIO(server);
	var connections = [];

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

	return {
		io: io,
		connections: connections
	};
}

module.exports = chatSockets;
