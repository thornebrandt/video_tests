import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');
const test_options = require('../../data/test-options');
const UserCreation = require('../User/UserCreation');
const StandardTest = require('./StandardTest');
const VideoContainer = require('./VideoContainer');
const TestTimer = require('./TestTimer');
const moment = require('moment');

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
			showVideo: true,
			timerRunning: false,
			timeLeft: 1000
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

		if(challenge.id === "timer"){
			state.timer = true;
			state.timerRunning = false;
			//state.timeLeft = challenge.limit
			state.timeLeft = 4;
		}

		return state;
	},

	render(){
		let test = this.state.test;
		return (
			<div className="container">
				{this.state.timer && <TestTimer
										onTimerUpdate={this.onTimerUpdate}
										timerRunning={this.state.timerRunning}
										timeLeft={this.state.timeLeft}/>}
				<div className="r   ow">
					<div className="col-xs-12">
						<h3><strong>{test.video.title} video</strong> - {test.type} questions - {test.challenge.description }</h3>
					</div>
					{this.renderWrongAnswers()}
					{this.renderTestContent()}
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

	renderTestContent(){
		return (
			<div>
				{!this.state.user_id && <UserCreation user={this.state.user} getUser={this.getUser}/>}
				{!this.state.completed && this.state.user_id && this.renderTest()}
				{this.state.completed && <Results
											user={this.state.user}
											failed={this.state.failed}
										 />}

			</div>
		);
	},

	renderVideo(){
		return <VideoContainer
			test={this.state.test}
			onVideoEvent={this.onVideoEvent}
			onClose={this.onCloseVideo}
			onPlay={this.onPlayVideo}
		/>
	},

	renderTest(){
		return (
			<div>
				{this.state.showVideo && this.renderVideo()}
				{!this.state.showVideo && this.renderQuestions()}
			</div>
		);
	},

	renderQuestions(){
		return (
			<div>
				<a className="btn large-text" onClick={this.onReplayVideo}>
					<span className="glyphicon glyphicon-film"> </span> - Replay Video
				</a>
				<StandardTest test={this.state.test} step={this.state.step} onAnswer={this.onAnswer} getLength={this.getLength} />
			</div>
		);
	},

	onVideoEvent(event){
		//For Logging
		console.log("video event: ", event);
	},

	onCloseVideo(){
		this.setState({
			showVideo: false
		});
	},

	onPlayVideo(){
		let plays = this.state.plays;
		plays++;
		this.setState({
			plays: plays
		});
		if(plays === 1){
			//it's the first.
			this.onFirstPlay();
		}

		//PSEUDO - REMOVE COIN FROM PLAYS
	},

	onFirstPlay(){
		if(this.state.timer){
			this.startTimer();
		}
	},

	startTimer(){
		this.setState({
			timerRunning: true
		});
	},

	onReplayVideo(){
		this.setState({
			showVideo: true
		});
	},

	onTimerUpdate(){
		let timeLeft = this.state.timeLeft;
		timeLeft--;
		if(timeLeft >= 0){
			this.setState({
				timeLeft: timeLeft
			});
		} else {
			this.onTimerComplete();
		}
	},

	onTimerComplete(){
		this.setState({
			timerRunning: false,
			completed: true,
			failed: true
		});
	},

});

let Results = React.createClass({
	render(){
		let greeting = "Nice Work";
		if(this.props.failed){
			greeting = "Nice Try";
		}
		return (
			<div className="col-xs-12">
				<h1><strong>{greeting}, {this.props.user.name}.</strong> let's see how you did.</h1>
			</div>
		)
	}
});


module.exports = Test;