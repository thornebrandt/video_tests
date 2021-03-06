import React from 'react';
import { render, IndexRoute } from 'react-dom';
import { browserHistory, Redirect, Router, Route, Link } from 'react-router'
const TestList = require('./modules/Tests/TestList');
const Test = require('./modules/Tests/Test');
const Admin = require('./modules/Admin/Admin');
const Helpers = require('./helpers/Helpers');
const Index = require('./modules/Index');

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
	onHomeLinkClickHandler(e){
		e.preventDefault();
		browserHistory.push('/');
	},

	onTestClickHandler(e){
		e.preventDefault();
		browserHistory.push('/test');
	},

	componentWillMount(){
		Helpers.init();
	},

	render(){
		return (
			<div>
				<div className="nav">
					<a className="btn" href="/" onClick={this.onHomeLinkClickHandler}>Home</a>
					<Link className="btn" to="/tests">About</Link>
					<a className="btn" href='/test' onClick={this.onLinkClickHandler}>New Random Test</a>
					<div className="pull-right">
						<Link className="btn" to="/admin">Admin</Link>
					</div>
				</div>
				{!this.props.children && <Index />}
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
				<Route path="/test(/:video)" component={Test} />
				<Route path="/admin" component={Admin} />
			</Route>
			<Route path="*" component={PageNotFound} />
		</Router>
	),
	document.getElementById('main')
);