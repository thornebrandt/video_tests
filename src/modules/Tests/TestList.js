import 'whatwg-fetch';
const React = require('react');
import { render } from 'react-dom';
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
import { Button } from 'react-bootstrap';
const test_options = require('../../data/test-options');


const hypothesis= (
	<div>
		<div className="jumbotron">
				<h1 className="text-center">Video Tests</h1>
				<p>
					<b>Main Hypothesis:</b> Retention, Reflection, and Engagement will be drastically
					improved if there is a sense of need to resolve a
					problem <strong>inside of a narrative</strong>.
					If there is a incentive to discover supplementary material
					from solving puzzles, learning the material will be desirable.
				</p>
				<p>
					Smaller improvements can be made by increasing the sense of urgency,
					such as using a visible timer and a known limit to the amount of times that a
					video can be opened.
					There is a broad range of points that can be measured.
					For example, deductions for time used and number of replays.
					Whether or not to show the point system to the student should be considered but
					treated delicately.
				</p>
				<p>
					Other suggestions:
					<ul>Persistent Notepad</ul>
					<ul>Allow the purchase of a 'play' with points</ul>
					<ul>Provide a video effect that 'distorts' the video</ul>
				</p>

		</div>
		<div className="row">
			<div className="col-xs-12 text-center">
				<h2>Which Test do you Wanna Take?</h2>
				<hr />
			</div>
		</div>
	</div>
);

let TestList = React.createClass({
	getInitialState(){
		return {}
	},

	render(){
		return (
			<div className="container">
				{hypothesis}
				<VideoChoice video={this.state.video} chooseVideo={this.chooseVideo} />
				{this.state.video && <TypeChoice type={this.state.type} chooseType={this.chooseType} />}
				{this.state.type && <ChallengeChoice challenge={this.state.challenge} chooseChallenge={this.chooseChallenge} />}
				{this.state.challenge && <StartTest props={this.state} onStartTest={this.onStartTest} />}
				<footer className="pull-right"><small>*suggested ( hypothesized improvement in retention )</small></footer>
			</div>
		)
	},

	chooseVideo(video){
		this.setState({
			video: video
		});
	},

	chooseType(type){
		this.setState({
			type: type
		});
	},

	chooseChallenge(challenge){
		this.setState({
			challenge: challenge
		});
	},

	onStartTest(){
		let test = this.state;
		this.props.onStartTest(test);
		// return render(
		// 	(
		// 		<div className="container">
		// 			<h1>how you like me now</h1>
		// 		</div>
		// 	),
		// 	document.getElementById('main')
		// )
	}
});


let VideoChoice = React.createClass({
	render(){
		let videos = ['mathnet', 'zombie'];
		let content, choices;
		if(this.props.video){
			let videoOption = test_options.videos[this.props.video];
			content = (
				<div className="row" style={videoOption.style} >
					<div className="col-xs-12 text-center">
						<span className="fake-link pull-right"
							onClick={() => this.props.chooseVideo(null)}>
							Change
						</span>
						<h3>Video: {videoOption.title}</h3>
						<p>{videoOption.description}</p>
					</div>
				</div>

			);
		} else {
			choices = videos.map((videoName) => {
				let videoOption = test_options.videos[videoName];
				return (
					<div className="col-xs-6 text-center hover" style={videoOption.style}
						key={videoName} onClick={() => this.props.chooseVideo(videoName)}>
						<h2>{videoOption.title}</h2>
						<p>{videoOption.description}</p>
					</div>
				);
			});
			content = (
				<div>
					<div className="row">
						<div className="col-xs-12">
							<h3>Choose Video</h3>
						</div>
					</div>
					<div className="row">
						{choices}
					</div>
				</div>
			);
		}

		return content;
	}
});

let TypeChoice = React.createClass({
	render(){
		let types = ['standard', 'narrative'];
		let content, choices;
		if(this.props.type){
			let typeOption = test_options.types[this.props.type];
			content = (
				<div className="row text-center">
					<div style={typeOption.style} className="col-xs-12">
						<span className="fake-link pull-right hover"
							onClick={() => this.props.chooseType(null)}>
							Change
						</span>
						<h3>Test Type: {typeOption.title}</h3>
						<p>{typeOption.description}</p>
					</div>
				</div>
			);
		} else {
			choices = types.map((typeName) => {
				let typeOption = test_options.types[typeName];
				return (
					<div className="col-xs-6 text-center hover" key={typeName}
						style={typeOption.style} onClick={() => this.props.chooseType(typeName)}>
						<h2>Test Type: {typeOption.title}</h2>
						<p>{typeOption.description}</p>
					</div>
				);
			});
			content = (
				<div>
					<div className="row">
						<div className="col-xs-12">
							<h3>Choose Test Type: </h3>
						</div>
					</div>
					<div className="row">
						{choices}
					</div>
				</div>
			);
		}

		return content;
	}
});


let ChallengeChoice = React.createClass({
	render(){
		let types = ['none', 'timer', 'plays'];
		let content, choices;
		if(this.props.challenge){
			let challengeOption = test_options.challenges[this.props.challenge];
			content = (
				<div className="row text-center">
					<div style={challengeOption.style} className="col-xs-12">
						<span className="fake-link pull-right hover"
							onClick={() => this.props.chooseChallenge(null)}>
							Change
						</span>
						<h3>Added Challenge: {challengeOption.title}</h3>
						<p>{challengeOption.description}</p>
					</div>
				</div>
			);
		} else {
			choices = types.map((challengeName) => {
				let challengeOption = test_options.challenges[challengeName];
				return (
					<div className="col-xs-4 text-center hover" key={challengeName}
						style={challengeOption.style} onClick={() => this.props.chooseChallenge(challengeName)}>
						<h4>{challengeOption.title}</h4>
						<p>{challengeOption.description}</p>
					</div>
				);
			});
			content = (
				<div>
					<div className="row">
						<div className="col-xs-12">
							<h3>Choose Added Challenge: </h3>
						</div>
					</div>
					<div className="row">
						{choices}
					</div>
				</div>
			);
		}

		return content;
	}
});


let StartTest = React.createClass({
	render(){
		return(
			<div className="row text-center top-buffer">
				<button className="btn btn-primary top30" onClick={this.props.onStartTest}>Take that Test</button>
			</div>
		);
	}
});



module.exports = TestList;