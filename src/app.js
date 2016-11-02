import React from 'react';
import { render, IndexRoute } from 'react-dom';
import { browserHistory, Redirect, Router, Route, Link } from 'react-router'
const TestList = require('./modules/Tests/TestList');
const Test = require('./modules/Tests/Test');
const Admin = require('./modules/Admin/Admin');


const IndexClass = React.createClass({
	render(){
		return (
			<div>
				<div className="jumbotron text-center">
						<h1 className="text-center">Video Tests</h1>
						<Link className="btn btn-primary text-center" to="/test/">Take Random Test</Link>
						<Link className="btn btn-success" to="/test/zombie?type=narrative&challenge=plays" >Take Suggested Test</Link>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h3>Admin</h3>
							<hr />
							<Link className="btn" to="/tests/">Info about tests</Link><br />
							<Link className="btn" to="/admin/">See Data</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

class PageNotFound extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="jumbotron">
					<h1 className="text-center">404</h1>
					<h2 className="text-center">Sorry we couldn't find that route</h2>
				</div>
			</div>
		);
	}
}

const App = React.createClass({
	onHomeClickHandler(e){
		e.preventDefault();
		browserHistory.push('/');
	},

	render(){
		return (
			<div>
				<div className="nav">
					<a className="btn" onClick={this.onHomeClickHandler}>Home</a>
					<div className="pull-right">
					</div>
				</div>
				{!this.props.children && <IndexClass />}
				{this.props.children}
			</div>
		);
	}
});

render(
	(
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/tests" component={TestList} />
				<Route path="/test/(:video)" component={Test} />
				<Route path="/admin" component={Admin} />
			</Route>
			<Route path="*" component={PageNotFound} />
		</Router>
	),
	document.getElementById('main')
);