const React = require('react');
const moment = require('moment');
const timer = require('react-native-timer');

String.prototype.toMMSS = function () {
	let mili_num = parseInt(this, 10);
	let sec_num = Math.floor(mili_num / 1000);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}


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
		let timeLeft = this.props.timeLeft.toString().toMMSS();
		let timerStyle = {
			position: "absolute",
			right: "10px",
			top: "40px"
		}
		return(
			<div className="large-text" style={timerStyle}>
				{timeLeft}
			</div>
		);
	}
});

module.exports = TestTimer;
