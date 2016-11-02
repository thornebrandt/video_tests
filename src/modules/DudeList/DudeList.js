import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const moment = require('moment');
const querystring = require('querystring')
let DudeAdd = require('./DudeAdd');
let DudeFilter = require('./DudeFilter');

let DudeTable = React.createClass({
	render(){
		let dudeRows = this.props.dudes.map((dude) => {
			dude.created_formatted = new moment(dude.created).fromNow();
			return <DudeRow key={dude._id} dude={dude} />
		});


		return (
			<table>
				<thead>
					<tr>
						<th>ID</th><th>Name</th><th>Saying</th><th>Age</th><th>Created</th>
					</tr>
				</thead>
				<tbody>
					{dudeRows}
				</tbody>
			</table>
		)
	}
});

let DudeRow = React.createClass({
	render(){
		let dude = this.props.dude;
		return (
			<tr>
				<td>{dude._id}</td>
				<td>
					<Link to={`/dude/${dude.name}`}>
						{dude.name}
					</Link>
				</td>
				<td>{dude.saying}</td>
				<td>{dude.age}</td>
				<td>{dude.created_formatted}</td>
			</tr>
		)
	}
});


let DudeList = React.createClass({
	getInitialState(){
		return {
			dudes: []
		}
	},


	render(){
		return (
			<div>
				<h1>Dudes </h1>
				<hr />
				<DudeFilter submitHandler = { this.changeFilter } initFilter={this.props.location.query} />
				<DudeTable dudes={this.state.dudes} />
				<hr />
				<DudeAdd addDude={this.addDude} />
			</div>
		)
	},

	componentDidMount(){
		this.loadData();
	},

	componentDidUpdate: function(prevProps){
		if(prevProps.location.search == this.props.location.search){
			return;
		} else {
			this.loadData();
		}
	},

	changeFilter: function(newFilter){
		this.props.router.push({
			pathname: '/dudes',
			query: newFilter
		});
	},

	loadData: function(){
		let query = this.props.location.search;
		return fetch('/api/dudes' + query)
		.then((response) => response.json())
		.then((data) => {
			this.setState({ dudes: data });
		})
		.catch((error) => {
			console.log("error fetching ", error);
		});
	},

	addDude(dude){
		return fetch('/api/dudes', {
			method: 'POST',
			body: JSON.stringify(dude),
			mode: 'cors',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((response) => response.json())
		.then((data) => {
			let dude = data;
			let dudesModified = this.state.dudes.concat(dude);
			this.setState({dudes: dudesModified});
		})
		.catch((error) => {
			console.log("error posting ", error);
		});
	}
});

module.exports = DudeList;