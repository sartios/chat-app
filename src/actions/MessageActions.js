var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageConstants = require('../constants/MessageConstants');
var SocketHandler = require('../api/SocketHandler');

var MessageActions = {
  create: function(message){
    console.log('MessageActions.create');
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      message: message
    });
  },
  emitMessage: function(body){
  	SocketHandler.emit(body);
  },
  init: function(callback){
  	SocketHandler.init(callback);
  }
};

module.exports = MessageActions;
