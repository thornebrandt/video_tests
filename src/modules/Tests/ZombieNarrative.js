const React = require('react');

const ZombieNarrative = React.createClass({
	render(){
		let greenTheme = {
			backgroundColor: "#A5D6A7"
		};

		return(
			<div className="row" style={greenTheme} >
				{this.renderQuestions(this.props.step)};
			</div>
		);
	},

	//TODO - DEAR GOD HOW HAVE I JUST REALIZED I NEED NON-LINEAR PATHS,
	// for another day.
	answers: [
		1
	],

	//TODO - inheritance seems like it might work well here.
	setLength(length){
		this.length = length;
		this.props.getLength(length);
	},

	renderQuestions(step){
		let narrativeText = {
			fontSize: "20px"
		}

		let questions = [
			(
				<div className="row" style={narrativeText}>
						<div className="col-xs-5 text-center">
							<img src={'/images/zombie/receptionist.png'} className='img-responsive top20' />
						</div>
						<div className="col-xs-7 top20">
							<h3>You decided to answer the plea video</h3>
							<p>You make your way to the scientists underground lair.</p>
							<p>There is a mechanical receptionist filing her nails and glaring at you.</p>
							<p><strong>"Appointments Only"</strong></p>
							<p>She points at a blood soaked sign</p>
							<div className="col-xs-6 text-center top20">
								<a href="#" className="btn btn-default" data-answer={0}  onClick={this.checkAnswer} >
									"I have an appointment."
								</a>
							</div>

							<div className="col-xs-6 text-center top20">
								<a href="#" className="btn btn-default" data-answer={1} onClick={this.checkAnswer} >
									"I challenge you to a dual!"
								</a>
							</div>
						</div>
				</div>
			)
		]

		this.setLength(questions.length);
		return questions[step];
	},

	checkAnswer(e){
		//TODO - these can be hashed so as not to be looked up.
		e.preventDefault();
		let target = e.target;
		let answer = target.getAttribute("data-answer");
		if(parseInt(answer) === parseInt(this.answers[this.props.step])){
			this.props.onAnswer(true);
		} else {
			this.animateWrongAnswer(target);
			this.props.onAnswer(false);
		}
	},

	animateWrongAnswer(target){
		target.classList.remove('failure');
		setTimeout(() => {
			target.classList.add('failure');
		}, 10);
	}

});

module.exports = ZombieNarrative
