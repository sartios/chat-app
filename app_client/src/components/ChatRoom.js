var React = require('react');
var ConnectedUsers = require('./ConnectedUsers');
var RoomMessages = require('./RoomMessages');
var MessageBox = require('./MessageBox');


var ChatRoom = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-sm-4">
            <ConnectedUsers />
        </div>
        <div id="chatroom" className="col-sm-8">
          <RoomMessages/>
          <MessageBox />
        </div>
      </div>)
  }
});

module.exports = ChatRoom;
