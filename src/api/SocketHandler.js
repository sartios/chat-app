var io = require('socket.io/node_modules/socket.io-client');

var SocketHandler = {
	addEventListener: function(event, callback){
		this.socket.on(event, callback);
	},
	emit: function(event, message){
		this.socket.emit(event, message);
	},
	connect: function(room){
		this.socket = io(room);
	}
};


module.exports = SocketHandler;