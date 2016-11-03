let React = require('react');
let MathStandard = require('./MathNetStandard');
let TestStep= React.createClass({

	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
					<MathStandard step={this.props.step} onAnswer={this.props.onAnswer} />
				</div>
			</div>
		)
	}
});

module.exports = TestStep;