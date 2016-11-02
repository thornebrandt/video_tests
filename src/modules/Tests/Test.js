import 'whatwg-fetch';
import YoutubePlayer from 'react-youtube-player';
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');


const test_options = require('../../data/test-options');

let Test = React.createClass({
	getInitialState(){
		return this.getTest();
	},

	getTest(){
		const videos = ['mathnet', 'zombie'];
		const types = ['standard', 'narrative'];
		const challenges = ['none', 'timer', 'plays'];

		console.log(this.props.params);

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
			}
		}
		return state;
	},

	componentDidMount(){
		console.log("component did mount");
	},

	render(){
		console.log(this.props);
		let test = this.state.test;
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h3><strong>{test.video.title} video</strong> - {test.type} questions - {test.challenge.description }</h3>
						<YoutubePlayer
						    videoId={test.video.url}
						    playbackState='unstarted'
						    configuration={
						        {
						            showinfo: 0,
						            controls: 0
						        }
						    }
						/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Test;