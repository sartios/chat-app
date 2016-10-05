var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var SocketHandler = require('../api/SocketHandler');

var UserActions = {
	init: function(){
		var self = this;
		SocketHandler.addEventListener('user_connected', self.userConnected);
		SocketHandler.addEventListener('user_disconnected', self.userDisconnected);
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
