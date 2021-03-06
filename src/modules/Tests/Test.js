import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');
const Link = require('react-router').Link;
const test_options = require('../../data/test-options');
const UserCreation = require('../User/UserCreation');
const StandardTest = require('./StandardTest');
const VideoContainer = require('./VideoContainer');
const ZombieNarrative = require('./ZombieNarrative');
const MathNetNarrative = require('./MathNetNarrative');
const TestTimer = require('./TestTimer');
const moment = require('moment');
const timer = require('react-native-timer');

let Test = React.createClass({
	getInitialState(){
		return this.getTest();
	},

	render(){
		let test = this.state.test;
		return (
			<div>
				<div className="container">
					{this.state.timer && <TestTimer
											onTimerUpdate={this.onTimerUpdate}
											timerRunning={this.state.timerRunning}
											timeLeft={this.state.timeLeft}/>}
					<div className="row">
						<div className="col-xs-12">
							<h3><strong>{test.video.title} video</strong> - {test.type} questions - {test.challenge.description }</h3>
						</div>
						{this.renderWrongAnswers()}
						{this.renderTestContent()}
					</div>
					<hr />
				</div>
				{this.renderAnswerFeedback()}
			</div>
		);
	},

	renderAnswerFeedback(){
		return(
			<div>
				<div id='wrongAnswer'>
					<span>
						WRONG!
					</span>
				</div>
				<div id='rightAnswer'>
					<span>
						RIGHT!
					</span>
				</div>
			</div>
		);
	},


	renderTestContent(){
		return (
			<div>
				{!this.state.user_id && <UserCreation user={this.state.user} getUser={this.getUser}/>}
				{!this.state.completed && this.state.user_id && this.renderTest()}
				{this.state.completed && <Results
											results={this.state}
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
		let test;
		if(this.state.test.type === "narrative"){

			if(this.state.test.id === "mathnet"){
				test = <MathNetNarrative
						test={this.state.test}
						step={this.state.step}
						onAnswer={this.onAnswer}
						getLength={this.getLength}
						/>
			} else {
				test = <ZombieNarrative
						test={this.state.test}
						step={this.state.step}
						onAnswer={this.onAnswer}
						getLength={this.getLength}
						/>
			}
		} else {
			test = <StandardTest
					test={this.state.test}
					step={this.state.step}
					onAnswer={this.onAnswer}
					getLength={this.getLength}
					/>
		}

		let replayVideo = (
			<a className="btn large-text" onClick={this.onReplayVideo}>
				<span className="glyphicon glyphicon-film"> </span> - Replay Video
			</a>
		);

		if(this.state.test.challenge.id === "plays"){
			let limit = this.state.test.challenge.limit;
			let plays = this.state.plays;
			let playsLeft = limit - plays;
			if(playsLeft > 0){
				replayVideo = (
					<a className="btn large-text" onClick={this.onReplayVideo}>
						<span className="glyphicon glyphicon-film"> </span> - { playsLeft } Plays Left
					</a>
				);
			} else {
				replayVideo = (
					<a className="btn large-text" disabled>
						<span className="glyphicon glyphicon-film"> </span> No More Plays :(
					</a>
				);
			}
		}

		return (
			<div>
				{replayVideo}
				{test}
			</div>
		);
	},

	componentDidMount(){
		this.checkUserFocus();
	},

	log(action, _log={}){
		if(!this.state.debug){
			//TODO - try ellipses syntax here ( es2017 ) ?
			let log = Object.assign({ action: action, timestamp: new Date() }, _log, this.state);
			return fetch('/api/logs', {
				method: 'POST',
				body: JSON.stringify(log),
				mode: 'cors',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.catch((error) => {
				console.log("error posting log ", error);
			});
		}
	},

	checkUserFocus(){
		timer.clearInterval("window_focus");
		timer.setInterval("window_focus",
			this.checkFocus,
			1000
		);
	},

	checkFocus(){
		//we will leave the video controls on the videos, but we will track
		//if the user goes to youtube in another tab.

		if(!document.hasFocus()){
			if(this.state.user_focused){
				//user has left recently
				let absentSince = new Date();
				this.setState({
					user_focused: false,
					absentSince: absentSince
				});
			}
		} else {
			if(!this.state.user_focused){
				//user came back
				this.setState({
					user_focused: true
				});
				let cameBack = new moment();
				let absentSince = new moment(this.state.absentSince);
				let unfocused_duration = moment.duration(cameBack.diff(absentSince)).asMilliseconds();
				if(unfocused_duration > 1000){
					this.log("unfocused", {
						duration: unfocused_duration
					});
				}
			}
		}
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
			timeUnfocused: 0,
			timeWatching: 0
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
			state.showVideo = false
		}

		if(challenge.id === "timer"){
			state.timer = true;
			state.timerRunning = false;
			state.timeLeft = challenge.limit
		}


		if(this.props.location.query.step){
			state.showVideo = false;
			state.step = this.props.location.query.step;
			state.user_id = 1,
			state.age = -1
			state.debug = true;
		}

		return state;
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
				this.animateAnswer("rightAnswer");
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
		this.log("wrong_answer");
		this.animateAnswer("wrongAnswer");
	},

	animateAnswer(_el){
		let fadeClass = 'fadeInOut';
		let el = document.getElementById(_el);
		el.classList.remove(fadeClass);
		setTimeout(() => {
			el.classList.add(fadeClass);
		}, 10);

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
		this.log("right_answer");
	},

	completeTest(failed=false){
		let test_start = this.state.test_start_timestamp;
		let test_duration;
		if(test_start){
			let test_end = new moment();
			let test_start = new moment(this.state.test_start_timestamp);
			test_duration = moment.duration(test_end.diff(test_start)).asMilliseconds();
		} else {
			test_duration = 15000;
			console.log("That's odd, there was no test start.");
		}
		this.setState({
			completed: true,
			failed: failed,
			test_duration: test_duration,
			timerRunning: false
		});
		this.log("completed", { test_duration: test_duration });
	},

	onTimerComplete(){
		this.completeTest(true);
	},

	getLength(length){
		//to make sure we're dependent on questions that exist in test
		this.length = length;
	},

	onVideoEvent(event){
		this.log(event.action, { video_event: event });
	},

	onCloseVideo(){
		this.setState({
			showVideo: false
		});
		this.checkTestStartTimeStamp();
		this.log("close_video");
	},

	checkTestStartTimeStamp(){
		if(!this.state.test_start_timestamp){
			this.state.test_start_timestamp = new Date();
		}
		if(!this.state.timerRunning){
			this.startTimer();
		}
	},

	onPlayVideo(){
		if(this.state.plays <= 1){
			//it's the first.
			this.onFirstPlay();
		} else {
			this.log("play_video");
		}
		this.checkTestStartTimeStamp();
		//PSEUDO - REMOVE COIN FROM PLAYS
	},

	onFirstPlay(){
		this.log("first_play");
		if(this.state.timer){
			this.startTimer();
		}
	},

	startTimer(){
		this.setState({
			timerRunning: true,
			plays: 1
		});
	},

	onReplayVideo(){
		let plays = this.state.plays;
		plays++;
		this.setState({
			plays: plays
		});

		this.setState({
			showVideo: true
		});
		this.log("play_video");
	},

	onTimerUpdate(){
		let timeLeft = this.state.timeLeft;
		timeLeft = timeLeft - 1000;
		if(timeLeft >= 0){
			this.setState({
				timeLeft: timeLeft
			});
		} else {
			this.onTimerComplete();
		}
	},

});

let Results = React.createClass({
	render(){
		//TODO - save this for smaller logs 'results', made for comparisons

		let greeting = "Nice Work";
		let duration = this.props.results.test_duration.toString().toMMSS();

		if(this.props.results.failed){
			greeting = "Nice Try";
			duration = "Ran Out of Time :(";
		}
		let user = this.props.results.user;
		let logsLink = "/api/" + user._id + "/logs";

		return (
			<div className="col-xs-12">
				<h1><strong>{greeting}, {user.name}.</strong> let's see how you did.</h1>
				<h3>Time Spent: {duration}</h3>
				<h3>Wrong Answers: {this.props.results.wrong}</h3>
				<a href={logsLink}>User Logs</a><br />
				<a className="btn btn-success" href='/test' onClick={this.onLinkClickHandler}>New Random Test</a><br />
				<Link className="btn btn-warning" to="/admin">Admin</Link>
			</div>
		)
	}
});


module.exports = Test;