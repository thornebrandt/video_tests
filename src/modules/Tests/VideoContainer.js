import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');

let VideoContainer = React.createClass({
	render(){
		return(
			<div>
				<a className="btn btn-primary" onClick={this.props.onClose}>Take me to Test</a>
			</div>
		)
	}

});


module.exports = VideoContainer;

