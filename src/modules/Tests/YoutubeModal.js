import 'whatwg-fetch';
const React = require('react');
const ReactDOM = require('react-dom');

let YoutubeModal = React.createClass({
	render(){
		return(
			<div class="modal">
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
		)
	}

});


