import 'whatwg-fetch';
import YoutubePlayer from 'react-youtube-player';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');
const test_options = require('../../data/test-options');
const UserCreation = require('../User/UserCreation');
const StandardTest = require('./StandardTest');
const VideoContainer = require('./VideoContainer');

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
			step: 0,
			wrong: 0,
			showVideo: true
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
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h3><strong>{test.video.title} video</strong> - {test.type} questions - {test.challenge.description }</h3>
					</div>
					{this.renderWrongAnswers()}
					{!this.state.showVideo && this.renderTest()}
					{this.state.showVideo && <VideoContainer test={this.state.test} />}
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
		} else {
			this.onWrongAnswer();
		}
	},

	onWrongAnswer(){
		let wrong = this.state.wrong;
		wrong++;
		this.setState({
			wrong: wrong
		});
	},


	renderWrongAnswers(){
		let answers = this.state.wrong || 0;
		let content = [];
		let wrongAnswerStyle = {
			fontSize: "30px",
			fontWeight: "800",
			marginLeft: "30px",
			color: "#F50057"
		}
		let spanStyle = {
			margin : "0px 10px 0px 10px"
		}

		for(let i = 0; i < answers; i++){
			content.push(
				<span key={i} className="glyphicon glyphicon-remove"></span>
			);
		}
		return(
			<div style={wrongAnswerStyle}>
				{content}
			</div>
		);
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

	renderVideo(){
		return (
			<div>
				<h1>VIDEO</h1>
				<a className="btn btn-primary">I'm Ready For Test</a>
			</div>
		);
	},

	renderTest(){
		return (
			<div>
				{!this.state.user_id && <UserCreation user={this.state.user} getUser={this.getUser}/>}
				{!this.state.completed && this.state.user_id && this.renderQuestion()}
				{this.state.completed && <Results user={this.state.user}  />}
			</div>
		);
	},

	renderQuestion(){
		return <StandardTest test={this.state.test} step={this.state.step} onAnswer={this.onAnswer} getLength={this.getLength} />
	},

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