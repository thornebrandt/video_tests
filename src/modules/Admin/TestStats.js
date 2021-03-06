import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const moment = require('moment');

let TestStats = React.createClass({

	componentDidMount(){
		console.log("component did mount");
	},

	render(){
		return(
			<div>
				<h3>Test Stats</h3>
				{this.props.test_logs && <ResultTable test_logs={this.props.test_logs} />}
			</div>
		);
	}
});


const ResultTable = React.createClass({
	getRows(){
		return this.props.test_logs.map((log, i) => {
			return ( <ResultRow log={log} key={i} /> )
		});
	},

	render(){

		return(
			<table className="table table-bordered table-striped">
				<thead>
					<tr>
						<td>Name</td>
						<td>Test</td>
						<td>Type</td>
						<td>Challenge</td>
						<td>Age</td>
						<td>Wrong Answers</td>
						<td>Duration</td>
						<td>Date</td>
					</tr>
				</thead>
				<tbody>
					{this.getRows()}
				</tbody>
			</table>
		);
	}
});

const ResultRow = React.createClass({
	render(){
		try{

			let log = this.props.log;
			let video_title = log.test.video.title;
			let readableTimeStamp = new moment(log.timestamp).format("dddd, MM/DD/YYYY, h:mm:ss a");
			let testDuration = log.test_duration || 1500;
			let readableDuration = testDuration.toString().toMMSS();
			let user = log.user || { name: "debug", age: -1 };
			return(
				<tr>
					<td>{user.name}</td>
					<td>{video_title}</td>
					<td>{log.test.type}</td>
					<td>{log.test.challenge.id}</td>
					<td>{user.age}</td>
					<td>{log.wrong}</td>
					<td>{readableDuration}</td>
					<td>{readableTimeStamp}</td>
				</tr>
			);
		} catch(e){
			console.log(e);
		}
	}
});






module.exports = TestStats;