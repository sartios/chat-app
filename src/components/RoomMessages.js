var React = require('react');
var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');

var RoomMessages = React.createClass({
	getInitialState: function(){
		return {
			messages: MessageStore.getMessages()
		}
	},
	componentDidMount: function(){
		MessageStore.addChangeListener(this.updateMessages);
	},
	updateMessages: function(){
		this.setState({
			messages: MessageStore.getMessages()
		});
	},
	render: function(){
		var messages = this.state.messages.map(function(message, index){
			var img = message.img ? <img src={message.img} width='100' height='50'/> : null;
			return <li key={index}><b>{message.from}:</b>{message.body}{img}</li>
		});
    return (
    	<div>
			{messages}
    	</div>)
	}
});

module.exports = RoomMessages;