var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var SocketHandler = require('../api/SocketHandler');

var UserActions = {
	init: function(){
		var self = this;
		SocketHandler.addEventListener('user_connected', self.userConnected);
		SocketHandler.addEventListener('user_disconnected', self.userDisconnected);
		fetch('http://localhost:8000/connections').then(function(response){
			return response.json();
		}).then(function(body){
			var connections = JSON.parse(body.connections);
			for(var i = 0; i < connections.length; i++){
				AppDispatcher.dispatch({
					actionType: UserConstants.USER_CONNECT,
					user: {id:connections[i]}
				});
			}
		});
	},
	userConnected: function(user){
		console.log('userConnected ' + user.id);
		AppDispatcher.dispatch({
			actionType: UserConstants.USER_CONNECT,
			user: user
		});
	},
	userDisconnected: function(user){
		console.log('userDisconnected: ' + user.id);
		AppDispatcher.dispatch({
			actionType: UserConstants.USER_DISCONNECT,
			user: user
		});
	}
};

module.exports = UserActions;
