import 'whatwg-fetch';
import YoutubePlayer from 'react-youtube-player';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');
const test_options = require('../../data/test-options');
const TestStep = require('./TestStep');
const UserCreation = require('../User/UserCreation');

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

		if(this.props.location.query.debug){
			state.user = {
				_id: -1,
				age: -1,
				name: "Debugger"
			}
			state.age = -1;
			state.user_id = 1;
		}

		return state;
	},

	render(){
		console.log("this.state.test:", this.state.test);
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
					{!this.state.user_id && <UserCreation user={this.state.user} getUser={this.getUser}/>}
					{this.state.user_id && <TestStep test={this.state.test} step={this.state.step} />}
				</div>
				<hr />

			</div>
		);
	},

	getUser(user){
		console.log("setting state: ", user);
		this.setState({
			user: user,
			age: user.age,
			user_id: user._id
		});
	}
});

module.exports = Test;