var React = require('react');
var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');
var io = require('socket.io/node_modules/socket.io-client');

var socket = io('/');

var MessageBox = React.createClass({
  getInitialState: function(){
		return {
			messages: MessageStore.getMessages()
		}
	},
	componentDidMount: function(){
		socket.on('message', this.handleMessage);
		MessageStore.addChangeListener(this.updateMessages);
	},
	updateMessages: function(){
		this.setState({
				messages: MessageStore.getMessages()
		});
	},
	handleMessage: function(message){
		MessageActions.create(message);
		this.updateMessages();
	},
	handleSubmit: function(e){
		var body = e.target.value;
		if(e.keyCode === 13 && body){
			var message = {
				body,
				from: 'Me'
			}
			MessageActions.create(message);
			socket.emit('message', body);
			e.target.value = '';
		}
	},
  render: function(){
    var messages = this.state.messages.map(function(message, index){
			var img = message.img ? <img src={message.img} width='100' height='50'/> : null;
			return <li key={index}><b>{message.from}:</b>{message.body}{img}</li>
		});
    return (<div>
			{messages}
      <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit}/>
    </div>)
  }
});

module.exports = MessageBox;
