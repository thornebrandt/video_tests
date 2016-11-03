let React = require('react');
let qs = require('../../Data/standard-test-questions');
let StandardTest = React.createClass({
	render(){
		this.getQuestions();
		return (
			<div className="row">
				<div className="col-xs-12">
					{this.renderQuestions([this.props.step])}
				</div>
			</div>
		)
	},

	getQuestions(){
		let test_id = this.props.test.id;
		this.questions = qs[test_id].questions;
		this.choices = qs[test_id].choices;
		this.answers = qs[test_id].answers;
		this.setLength(this.questions.length);
	},

	setLength(length){
		this.length = length;
		this.props.getLength(length);
	},

	renderQuestions(step){
		//TODO - make column width variable to length of answers
		let length = this.questions.length;
		let questions = this.questions.map((question, i) => {
			let choices = this.choices[i].map((choice, j) => {
				return (
					<div key={j} className="col-xs-4 text-center top20">
						<a href="#" className="btn btn-default" data-answer={j} onClick={this.checkAnswer} >
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
		if(parseInt(answer) === parseInt(this.answers[this.props.step])){
			this.props.onAnswer(true);
		} else {
			this.props.onAnswer(false);
		}
	},

});


module.exports = StandardTest;