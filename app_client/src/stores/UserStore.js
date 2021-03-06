var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var users = [];

function createUser(user){
	users.push(user);
}

function disconnectUser(user){
	users.splice(users.indexOf(user), 1);
}

var UserStore = assign({}, EventEmitter.prototype, {
	getUsers : function(){
		return users;
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case UserConstants.USER_CONNECT:
			createUser(action.user);
			UserStore.emitChange();
		break;
		case UserConstants.USER_DISCONNECT:
			disconnectUser(action.user);
			UserStore.emitChange();
		break;
	}
});

module.exports = UserStore;
