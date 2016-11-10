import React from 'react';
import { Link } from 'react-router'


const Index = React.createClass({
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
							<Link className="btn" to="/admin">See Data</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Index;