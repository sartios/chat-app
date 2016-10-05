var React = require('react');
var ReactDOM = require('react-dom');
var ChatRoom = require('./components/ChatRoom');
require('bootstrap/less/bootstrap.less');

var App = React.createClass({
	render: function(){

		return (
			<div className="container-fluid">
					<ChatRoom/>
			</div>);
	}
});

ReactDOM.render(<App/>, document.getElementById('root'));
