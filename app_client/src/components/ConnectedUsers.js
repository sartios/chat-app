var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var getState = function(){
  return {
    users: UserStore.getUsers()
  }
}

var ConnectedUsers = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function(){
    UserActions.init();
    UserStore.addChangeListener(this._onChange);
  },
  _renderUsers: function(){
    return this.state.users.map(function(user, index){
      return <li key={index}><span className="glyphicon glyphicon-user">{user.id}</span></li>
    })
  },
  _onChange: function(){
    this.setState(getState());
  },
  render: function(){
    var users = this._renderUsers();
    return (<div>
      {users}
    </div>)
  }
});

module.exports = ConnectedUsers;
