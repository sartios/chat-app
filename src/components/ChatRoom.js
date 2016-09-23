var React = require('react');
var ConnectedUsers = require('./ConnectedUsers');
//var RoomMessages = require('.');
//var MessageBox = require('.');


var ChatRoom = React.createClass({
  render: function(){
    return (<div className="container">
      <div className="row">
        <ConnectedUsers />
      </div>
    </div>)
  }
});

module.exports = ChatRoom;
