var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/MessageConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var messages = [];

function createMessage(message){
  console.log('MessageStore.createMessage');
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  message.id = id;
  messages.push(message);
}

var MessageStore = assign({}, EventEmitter.prototype, {
  getMessages: function(){
    return messages;
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
    case MessageConstants.MESSAGE_CREATE:
      createMessage(action.message);
      MessageStore.emitChange();
    break;
  }

});

module.exports = MessageStore;
