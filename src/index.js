var React = require('react');
var ReactDOM = require('react-dom');
var ChatRoom = require('./components/ChatRoom');

var App = React.createClass({
	render: function(){

		return (<div>
				<ChatRoom/>
			</div>);
	}
});

ReactDOM.render(<App/>, document.getElementById('root'));
