import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');
import YouTube from 'react-youtube';

let VideoContainer = React.createClass({
	render() {
		let videoOptions = {
			showinfo: 0
		}

		return ( < div className = "text-center" >
			< YouTube videoId = { this.props.test.video.url }
			opts = { videoOptions }
			onStateChange = { this.onVideoEvent }
			onPlaybackRateChange = { this.onPlaybackChange }
			/> < br / >
			< a className = "btn btn-primary"
			onClick = { this.props.onClose } > Take me to Test < /a> < /div>
		)
	},

	onPlaybackChange(e) {
		//interesting to test the correlation.
		let videoAction = {
			action: 'rate_change',
			speed: e.data,
			timecode: e.target.getCurrentTime()
		}
		if (this.props.onVideoEvent) {
			this.props.onVideoEvent(videoAction);
		}
	},

	onVideoEvent(e) {
		let action;
		switch (e.data) {
			case 0:
				action = "video_end";
				break;
			case 1:
				action = "play";
				this.props.onPlay();
				break;
			case 2:
				action = "pause";
				break;
			case -1:
			case 3:
			case 5:
				return;
			default:
				action = "unknown"
				break;
		}

		let videoAction = {
			action: action,
			youtube_event_code: e.data,
			timecode: e.target.getCurrentTime()
		}

		if (this.props.onVideoEvent) {
			this.props.onVideoEvent(videoAction);
		}
	}

});

module.exports = VideoContainer;
