var React = require('react');
var ReactDOM = require('react-dom');
var io = require('socket.io/node_modules/socket.io-client');
var ChatRoom = require('./components/ChatRoom');

var App = React.createClass({
	getInitialState: function(){
		return {
			messages: []
		}
	},
	componentDidMount: function(){
		this.socket = io('/');
		this.socket.on('message', this.handleMessage);
	},
	handleMessage: function(message){
		this.setState({
				messages: [message, ...this.state.messages]
		});
	},
	handleSubmit: function(e){
		var body = e.target.value;
		if(e.keyCode === 13 && body){
			var message = {
				body,
				from: 'Me'
			}
			var messages = this.state.messages;
			messages.push(message);
			this.setState({
				messages: messages
			});
			this.socket.emit('message', body);
			e.target.value = '';
		}
	},
	render: function(){
		var messages = this.state.messages.map(function(message, index){
			var img = message.img ? <img src={message.img} width='100' height='50'/> : null;
			return <li key={index}><b>{message.from}:</b>{message.body}{img}</li>
		})
		return (<div>
				<h1>Hello World</h1>
				<input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit}/>
				{messages}
				<ChatRoom/>
			</div>);
	}
});

ReactDOM.render(<App/>, document.getElementById('root'));
