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
						<h4><Link to="/tests/">Test Info/Hypothesises</Link></h4>
						TODO: make graphs and comparison.
						<br />
						<h4><a href={'/api/logs'}>Logs</a></h4>

				</div>
			</div>
		);
	}
});

module.exports = Admin;