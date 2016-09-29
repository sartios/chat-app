var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var SocketHandler = require('../api/SocketHandler');

var UserActions = {
	init: function(){
		var self = this;
		SocketHandler.addEventListener('user_connected', self.userConnected);
	},
	userConnected: function(user){
		console.log('userConnected ' + user.id);
		AppDispatcher.dispatch({
			actionType: UserConstants.USER_CONNECT,
			user: user
		});
	}
};

module.exports = UserActions;
