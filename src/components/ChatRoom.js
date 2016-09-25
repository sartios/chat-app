var React = require('react');
var ConnectedUsers = require('./ConnectedUsers');
//var RoomMessages = require('.');
var MessageBox = require('./MessageBox');


var ChatRoom = React.createClass({
  render: function(){
    return (<div className="container">
      <div className="row">
        <ConnectedUsers />
        <MessageBox />
      </div>
    </div>)
  }
});

module.exports = ChatRoom;
