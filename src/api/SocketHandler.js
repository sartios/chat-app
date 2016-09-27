var io = require('socket.io/node_modules/socket.io-client');

var SocketHandler = {
	init: function(callback){
		this.socket = io('/');
		this.socket.on('message', callback);
	},
	emit: function(body){
		this.socket.emit('message', body);
	}
};


module.exports = SocketHandler;