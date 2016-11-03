import 'whatwg-fetch';
import YoutubePlayer from 'react-youtube-player';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');
const test_options = require('../../data/test-options');
const UserCreation = require('../User/UserCreation');
const StandardTest = require('./StandardTest');

let Test = React.createClass({
	getInitialState(){
		return this.getTest();
	},

	getTest(){
		//TODO - videos might need to be renamed to tests.
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
				id: video.id
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
			state.debug = true;
			state.age = -1;
			state.user_id = 1;
		}

		return state;
	},

	render(){
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
					{!this.state.completed && this.state.user_id && this.renderTest()}
					{this.state.completed && <Results user={this.state.user}  />}
				</div>
				<hr />

			</div>
		);
	},

	getUser(user){
		this.setState({
			user: user,
			age: user.age,
			user_id: user._id
		});
	},

	onAnswer(correct){
		if(correct){
			let currentStep = this.state.step;
			currentStep++;
			//finished
			if(currentStep >= this.length){
				this.completeTest();
			} else {
				this.progress(currentStep);
			}
		}
	},

	progress(newStep){
		this.setState({
			step: newStep
		});
	},

	completeTest(){
		this.setState({
			completed: true
		});
	},

	getLength(length){
		//to make sure we're dependent on questions that exist in test
		this.length = length;
	},

	renderTest(){
		return <StandardTest test={this.state.test} step={this.state.step} onAnswer={this.onAnswer} getLength={this.getLength} />
	}


});

let Results = React.createClass({
	render(){
		return (
			<div className="col-xs-12">
				<h1>Nice Work, {this.props.user.name}, let's get your results</h1>
			</div>
		)
	}
});

module.exports = Test;