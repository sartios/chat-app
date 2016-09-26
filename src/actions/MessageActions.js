var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageConstants = require('../constants/MessageConstants');

var MessageActions = {
  create: function(message){
    console.log('MessageActions.create');
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      message: message
    });
  }
};

module.exports = MessageActions;
