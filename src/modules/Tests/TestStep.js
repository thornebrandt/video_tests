let React = require('react');

let TestStep= React.createClass({
	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
					<h2><strong>Question 1:</strong> What do you wanna do?</h2>
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