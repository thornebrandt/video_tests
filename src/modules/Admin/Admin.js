import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const fake_all_sessions = require('../../data/fake-all-sessions');

let Admin = React.createClass({
	render(){
		return(
			<div>
				<div className="jumbotron text-center">
						<h1 className="text-center">Admin</h1>
				</div>
			</div>
		);
	}
});

module.exports = Admin;