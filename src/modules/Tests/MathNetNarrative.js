const React = require('react');

const MathNetNarrative = React.createClass({
	render(){
		return(
			<div className="row" >
				{this.renderQuestions(this.props.step)};
			</div>
		);
	},

	renderQuestions(step){
		let narrativeText = {
			fontSize: "20px"
		}

		let folderLink = {
			display: "block",
			width: "100%",
			color: "white",
			fontSize: "26px",
			fontWeight: "bold",
			position: "absolute",
			bottom: "90px",
			right: "15px"
		}


		let questions = [
			(
				<div className="row">
						<div className="col-xs-5 text-center">
							<img src={'/images/mathnet/date_search.jpg'} className='img-responsive top20' />
						</div>
						<div className="col-xs-7 top20">
							<h3>Detectives Missing</h3>
							<p>You were just hired to find those two missing detectives.</p>
							<p>The video log you just watched is the last known log of their whearabouts</p>
							<p>The first thing we need to do is find the relative files on their last case in the computer.</p>
							<p><strong>What date log should we search through?</strong></p>
							<div className="col-xs-6 text-center top20">
								<a href="#" className="btn btn-default" data-answer={0}  onClick={this.checkAnswer} >
									FRIDAY December 12th 10:15pm
								</a>
							</div>

							<div className="col-xs-6 text-center top20">
								<a href="#" className="btn btn-default" data-answer={1} onClick={this.checkAnswer} >
									TUESDAY  October 5th  5:38pm
								</a>
							</div>

							<div className="col-xs-6 text-center top20">
								<a href="#" className="btn btn-default" data-answer={2} onClick={this.checkAnswer} >
									THURSDAY August 10th   9:43am
								</a>
							</div>

							<div className="col-xs-6 text-center top20">
								<a href="#" className="btn btn-default" data-answer={3} onClick={this.checkAnswer} >
									TUESDAY  July 4th, 4:45pm
								</a>
							</div>
						</div>
				</div>
			),
			(
				<div className="row" style={narrativeText}>
					<div className="col-xs-12">
						<h3>Suspect Files</h3>
						<p>You just received a ransom request. Time is running out. and you only have time to research one suspect. Who will it be? Pick a folder.</p>
					</div>
					<div className="col-xs-4 text-center">
						<a data-answer={0} onClick={this.checkAnswer} className="hover relative">
							<img src={'/images/mathnet/folder.png'} className='img-responsive top20' />
							<span style={folderLink} className="rotate45" >WILL CALL</span>
						</a>
					</div>
					<div className="col-xs-4 text-center relative">
						<a data-answer={1} onClick={this.checkAnswer} className="hover relative">
							<img src={'/images/mathnet/folder.png'} className='img-responsive top20' />
							<span style={folderLink} className="rotate45" >MR DOLLAR</span>
						</a>
					</div>
					<div className="col-xs-4 text-center relative">
						<a data-answer={2} onClick={this.checkAnswer} className="hover relative">
							<img src={'/images/mathnet/folder.png'} className='img-responsive top20' />
							<span style={folderLink} className="rotate45" >CASPER FLOOSH</span>
						</a>
					</div>
				</div>
			),
			(
				<div className="row">
					<div className="col-xs-5 text-center">
						<img src={'/images/mathnet/buzzers.png'} className='img-responsive top20' />
					</div>
					<div className="col-xs-7 top20">
						<h3>Arrived at Casper Floosh Address</h3>
						<p>None of these names seem to be who we are looking for.</p>
						<p>Could it be a case of stolen identity?</p>
						<p>We have to use visual clues to determine which apartment he lives in. </p>
						<p>Which apartment do you want to try? </p>
						<p><strong>What date log should we search through?</strong></p>

						<div className="col-xs-6 text-center top20">
							<a href="#" className="btn btn-default" data-answer={0}  onClick={this.checkAnswer} >
								A
							</a>

							<a href="#" className="btn btn-default" data-answer={1}  onClick={this.checkAnswer} >
								B
							</a>

							<a href="#" className="btn btn-default" data-answer={2}  onClick={this.checkAnswer} >
								C
							</a>

							<a href="#" className="btn btn-default" data-answer={3}  onClick={this.checkAnswer} >
								D
							</a>
						</div>
					</div>
				</div>
			)

		]
		this.setLength(questions.length);
		return questions[step];
	},

	answers: [
		2,
		2,
		2
	],

	//TODO - inheritance seems like it might work well here.
	setLength(length){
		this.length = length;
		this.props.getLength(length);
	},


	checkAnswer(e){
		//TODO - these can be hashed so as not to be looked up.
		e.preventDefault();
		let target = e.currentTarget;
		let answer = target.getAttribute("data-answer");

		console.log(answer + " , " +  parseInt(this.answers[this.props.step]) );

		if(parseInt(answer) === parseInt(this.answers[this.props.step])){
			this.props.onAnswer(true);
		} else {
			this.animateWrongAnswer(target);
			this.props.onAnswer(false);
		}
	},


	//TODO - move this to the parent directory
	animateWrongAnswer(target){
		target.classList.remove('failure');
		setTimeout(() => {
			target.classList.add('failure');
		}, 10);
	}

});

module.exports = MathNetNarrative
