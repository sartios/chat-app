var React = require('react');
var ConnectedUsers = require('./ConnectedUsers');
var RoomMessages = require('./RoomMessages');
var MessageBox = require('./MessageBox');


var ChatRoom = React.createClass({
  render: function(){
    return (<div className="container">
      <div className="row">
        <ConnectedUsers />
        <RoomMessages/>
        <MessageBox />
      </div>
    </div>)
  }
});

module.exports = ChatRoom;
