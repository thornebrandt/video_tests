const React = require('react');
const moment = require('moment');
const timer = require('react-native-timer');

const TestTimer = React.createClass({

	timerRunning: false,

	startTimer(){
		timer.clearInterval("countdown_timer");
		timer.setInterval("countdown_timer",
			this.props.onTimerUpdate,
			1000
		);
	},

	endTimer(){
		timer.clearInterval("countdown_timer");
	},

	render(){
		if(this.props.timerRunning){
			if(!this.timerRunning){
				this.startTimer();
				this.timerRunning = true;
			}
		} else {
			if(this.timerRunning){
				this.endTimer();
				this.timerRunning = false;
			}
		}
		let timeLeft = this.props.timeLeft;
		let timerStyle = {
			position: "absolute",
			right: "10px",
			top: "40px"
		}
		return(
			<div className="largeText" style={timerStyle}>
				{this.props.timeLeft}
			</div>
		);
	}
});

module.exports = TestTimer;
