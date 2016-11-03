let React = require('react');
let MathStandard = React.createClass({
	questions: [
		"What type of fraud were the detectives investigating?",
		"What is the date and time of the video detective log?",
		"How long has the newspaper salesman been selling newspapers?"
	],

	choices: [
		[
			"Scalping Tickets at Will Call",
			"Cheating at a Bike Race",
			"Car Insurance"
		],
		[
			"Friday, December 12th 10:15pm",
			"Thursday, August 10th, 9:43am",
			"Tuesday, October 5th, 10:15pm",
		],
		[
			"Since the Chicago Cubs won a Baseball Pennant",
			"Since Tuesday",
			"Since he got into a car accident",
		]
	],

	answers: [
		2,
		1,
		0
	],

	renderQuestions(step){
		let length = this.questions.length;
		let questions = this.questions.map((question, i) => {
			let choices = this.choices[i].map((choice, j) => {
				return (
					<div key={j} className="col-xs-4 text-center top20">
						<a href="#" className="btn btn-default" data-value={j} onClick={this.checkAnswer} >
							{choice}
						</a>
					</div>
				)
			});

			return (

				<div key={i} className="top50">
					<h3>{question} ( {i + 1} of {length} )</h3>
					{choices}
				</div>
			)
		});
		return questions[step];
	},

	checkAnswer(e){
		//TODO - these can be hashed so as not to be looked up.
		e.preventDefault();
		let answer = e.currentTarget.getAttribute("data-answer");
		if(answer === this.answers[this.props.step]){
			this.props.onAnswer(true);
		} else {
			this.props.onAnswer(false);
		}
	},


	render(){
		return this.renderQuestions([this.props.step]);
	}
});


module.exports = MathStandard;