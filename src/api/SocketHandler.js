var io = require('socket.io-client');

var SocketHandler = {
	addEventListener: function(event, callback){
		this.getSocket().on(event, callback);
	},
	emit: function(event, message){
		this.getSocket().emit(event, message);
	},
	connect: function(room){
		this.socket = io(room);
	},
	getSocket: function(){
		if(this.socket === undefined){
			this.socket = io('/');
		}
		return this.socket;
	}
};


module.exports = SocketHandler;
