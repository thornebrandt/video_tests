let React = require('react');

let TestStep= React.createClass({
	getInitialState(){
		return {
			test: this.props.test,
			step: this.props.test
		}
	},

	getQuestion(){
		switch(this.state.step){
			case 0:
				return (
					<div>
						<h3>What is the answer to this first question?</h3>
						<a href="#" onClick={this.answerQuestion}>
							Answer
						</a>
					</div>
				);
				break;
			case 1:
				return (
					<div>
						<h3>What is the answer to this second question?</h3>
						<a href="#" onClick={this.answerQuestion}>
							Answer
						</a>
					</div>
				);
				break;
			default:
				return (
					<div>We can't find that question</div>
				);
				break;
		}
	},

	answerQuestion(){
		let currentStep = this.state.step;
		currentStep++;
		this.setState({
			currentStep
		});
	},

	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
					hi
				</div>
			</div>
		)
	},

	addDudeHandler(e){
		e.preventDefault();
		let form = document.forms.addDudeForm;
		this.props.addDude({
			name: form.name.value,
			saying: form.saying.value,
			age: parseInt(form.age.value),
			created: new Date()
		});
	}
});

module.exports = TestStep;