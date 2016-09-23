var React = require('react');
var io = require('socket.io/node_modules/socket.io-client');
var ConnectedUsers = require('.');
var RoomMessages = require('.');
var MessageBox = require('.');


var ChatRoom = React.creatClass({
  render: function(){
    return (<div className="container">
      <div className="row">
        <ConnectedUsers />
        <RoomMessages />
        <MessageBox />
      </div>
    </div>)
  }
});

module.exports = ChatRoom;
