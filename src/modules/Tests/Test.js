import 'whatwg-fetch';
import YoutubePlayer from 'react-youtube-player';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');
const moment = require('moment');
const test_options = require('../../data/test-options');
const TestStep = require('./TestStep');

let Test = React.createClass({
	getInitialState(){
		return this.getTest();
	},

	getTest(){
		const videos = ['mathnet', 'zombie'];
		const types = ['standard', 'narrative'];
		const challenges = ['none', 'timer', 'plays'];
		let video_name = this.props.params.video || _.sample(videos);
		let video = test_options.videos[video_name];
		let type = this.props.location.query.type || _.sample(types);
		let challenge_name = this.props.location.query.challenge || _.sample(challenges);
		let challenge = video.challenges[challenge_name];
		let state = {
			test: {
				video: {
					title: video.title,
					url: video.url,

				},
				type: type,
				challenge: challenge,
			},
			plays: 0,
			step: 0
		}
		return state;
	},

	render(){
		console.log(this.state.test);
		let test = this.state.test;
		let content;
		if(this.state.user){
			content = ( <h2> Hello {this.state.user} </h2> )
		} else {
			content = ( <h2> You need a user </h2> )
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h3><strong>{test.video.title} video</strong> - {test.type} questions - {test.challenge.description }</h3>
					</div>
				</div>
				<hr />
				{!this.state.user && !this.state.foundUser && <UserAdd addUser={this.addUser}/>}
				{this.state.foundUser && <CheckUser foundUser={this.state.foundUser} addUser={this.addUser} useFoundUser={this.useFoundUser} />}
				{this.state.user && !this.state.age && <AgeAdd addAge={this.addAge} user={this.state.user} />}
				{this.state.age && <TestStep test={this.state.test} step={this.state.step} />}
			</div>
		);
	},

	addUser(user){
		this.getUser(user.name)
		.then((foundUser) => {
			if(foundUser){
				this.setState({
					foundUser: foundUser
				});
			} else {
				this.setState({
					foundUser: null,
					user: user
				});
			}
		});
	},

	useFoundUser(){
		let user = this.state.foundUser;
		let age = this.state.foundUser.age;
		this.setState({
			foundUser: null,
			user: user,
			age: age
		});
		console.log("useFoundUser", this.state);
	},

	addAge(agedUser){
		let user = this.state.user;
		user.age = agedUser.age;
		return fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((response) => response.json())
		.then((data) => {
			let user = data;
			this.setState({
				user: user,
				age: user.age
			});
		})
		.catch((error) => {
			console.log('error creating user: ', error);
		});
	},


	getUser(name){
		return fetch('/api/users/' + name)
		.then((response) => response.json())
		.then((data) => {
			console.log("got user: ", data);
			return data;
		})
		.catch((error) => {
			console.log("can't find dude", error);
		});
	}
});



let Step = React.createClass({
	render(){
		return(
			<div><h1>Step 1</h1></div>
		)
	}
});



let AgeAdd = React.createClass({
	render(){
		return(
			<form name="addAgeForm" onSubmit={this.onAddAge} >
				<div className="row top100">
					<div className="col-xs-12">
						<span className='large-text'>
							And how <strong>old</strong> are you, <strong>{this.props.user.name}</strong>?
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-10">
						<input type="text" className="form-control" name="age" type="number"
						placeholder="e.g. 12" min="2" max="175" autoComplete="off" required />
					</div>
					<div className="col-xs-2">
						<button className="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		)
	},

	onAddAge(e){
		e.preventDefault();
		let form = document.forms.addAgeForm;
		console.log("onAddAge: ", this.session);
		this.props.addAge({
			age: form.age.value,
		});
	}
});



let UserAdd = React.createClass({
	render(){
		return(
			<form name="addUserForm" onSubmit={this.onAddUser}>
				<div className="row top100">
					<div className="col-xs-12">
						<span className='large-text'>Before we begin, what is your <b>name</b>?</span>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-10">
						<input type="text" className="form-control" name="name" placeholder="Name: " autoComplete="off" required />
					</div>
					<div className="col-xs-2">
						<button className="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		)
	},

	onAddUser(e){
		e.preventDefault();
		let form = document.forms.addUserForm;
		this.props.addUser({
			name: form.name.value,
			created: new Date()
		});
	}
});


let CheckUser = React.createClass({
	render(){
		let ago = new moment(this.props.foundUser.created).fromNow();
		return(
			<div className="row top100">
				<div className="col-xs-12">
					<span className='large-text'>Are you <strong>{this.props.foundUser.age} years old</strong>, and did you sign up <strong>{ago}</strong> ?</span>
				</div>
				<div className="row">
					<div className="col-xs-3">
						<button className="btn btn-success" onClick={this.props.useFoundUser}>Yep, That's Me!</button>
					</div>
					<form name="addUserForm" className="col-xs-6 pull-right" onSubmit={this.onAddUser}>
						<div className="col-xs-9">
							<input type="text" className="form-control" name="name" placeholder="No, I'll try a different name: " autoComplete="off" required />
						</div>
						<div className="col-xs-2">
							<button className="btn btn-warning">New Login</button>
						</div>
					</form>
				</div>
			</div>
		);
	},

	onAddUser(e){
		e.preventDefault();
		let form = document.forms.addUserForm;
		this.props.addUser({
			name: form.name.value,
			created: new Date()
		});
	},

});


module.exports = Test;