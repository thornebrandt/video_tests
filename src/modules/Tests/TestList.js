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
					If there is a incentive to unlock <strong>supplementary content </strong>
					 by solving puzzles, learning the material will be desirable.
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
					<strong>Other suggestions:</strong>
				</p>
				<ul>
					<li>Allow the <i>purchase</i> of a 'replay' with points</li>
					<li>Don't have points, but make wrong answer run up the clock faster</li>
					<li>Provide a video effect that 'distorts' the video after every replay</li>
					<li>Persistent Notes text field</li>
					<li>Persistent drawing scratchpad. ( Studies have shown drawing is more effective than writing )</li>
					<li>Right now the 'paths' of the narrative are limited. Allow non-linear branching that stregthens interests</li>
					<li>Give wrong answers a second change to lead back to the right path, or go <strong>really wrong</strong></li>
					<li>An Educational 'Choose Your Own Adventure' that could lead to multiple videos</li>
				</ul>

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
				{this.state.challenge && <StartTest video={this.state.video} type={this.state.type} challenge={this.state.challenge} />}
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
		let testLink = "/test/" + this.props.video +"?type=" + this.props.type + "&challenge=" + this.props.challenge;
		return(
			<div className="row text-center top-buffer">
				<Link to={testLink} className="btn btn-primary top30">Take that Test</Link>
			</div>
		);
	}
});



module.exports = TestList;