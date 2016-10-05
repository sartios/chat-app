var React = require('react');
var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');

var MessageBox = React.createClass({
  getInitialState: function(){
		return {
			messages: MessageStore.getMessages()
		}
	},
	componentDidMount: function(){
		MessageActions.init(this.handleMessage);
	},
	handleMessage: function(message){
		MessageActions.create(message);
	},
	handleSubmit: function(e){
		var body = e.target.value;
		if(e.keyCode === 13 && body){
			var message = {
				body,
				from: 'Me'
			}
			MessageActions.create(message);
			MessageActions.emitMessage(body);
			e.target.value = '';
		}
	},
  render: function(){
    return (
		<div className="enter-message-div">
			<div className="form-group">
				<input id="message" className="form-control" type="text" placeholder='Enter your message here' onKeyUp={this.handleSubmit}/>
			</div>
    </div>);
	}
});

module.exports = MessageBox;
