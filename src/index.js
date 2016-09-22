var React = require('react');
var ReactDOM = require('react-dom');
var io = require('socket.io/node_modules/socket.io-client');

var App = React.createClass({
	render: function(){
		return (<div>
				Hello World!
			</div>);
	}
});

ReactDOM.render(<App/>, document.getElementById('root'));