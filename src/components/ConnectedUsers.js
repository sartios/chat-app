var React = require('react');

var ConnectedUsers = React.createClass({
  getInitialState: function(){
    var users = [];
    users.push({name: 'User 1'});
    users.push({name: 'User 2'});
    users.push({name: 'User 3'});
    return {
      users: users
    }
  },
  _renderUsers: function(){
    return this.state.users.map(function(user, index){
      return <li key={index}>{user.name}</li>
    })
  },
  render: function(){
    var users = this._renderUsers();
    return (<div className="col-sm-4">
      {users}
    </div>)
  }
});

module.exports = ConnectedUsers;
