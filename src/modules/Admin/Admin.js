import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const fake_all_sessions = require('../../data/fake-all-sessions');
const TestStats = require('./TestStats');

let Admin = React.createClass({
	getInitialState(){
		return {};
	},

	componentDidMount(){
		this.loadTestLogs();
	},

	loadTestLogs: function(){
		let query = this.props.location.search;
		return fetch('/api/logs?action=completed')
		.then((response) => response.json())
		.then((data) => {
			console.log("#>$@34");
			console.log(data);
			this.setState({ test_logs: data });
		})
		.catch((error) => {
			console.log("error fetching logs ");
		});
	},

	render(){
		return(
			<div>
				<div className="jumbotron text-center">
						<h1 className="text-center">Admin</h1>
						<h4><Link to="/tests/">Test Info/Hypothesises</Link></h4>
						TODO: make graphs and comparison.
						<br />
						<TestStats test_logs={this.state.test_logs} />
						<h4><a href={'/api/logs'}>Raw Logs</a></h4>
				</div>
			</div>
		);
	}
});

module.exports = Admin;