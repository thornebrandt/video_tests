const React = require('react');

const ZombieNarrative = React.createClass({
	getInitialState(){
		return {
			currentCode: "",
			flowersNeeded: [0, 2]
		};
	},

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
	// -- make this an actual rock paper scissors game.
	answers: [
		1,
		1,
		1,
		1,
		1,
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

		let codeLetter = {
			width: "35px",
			background: "green",
			color: "white"
		}


		let letterString = "abcdefghijklm";
		let codeArray = letterString.split("").map((l, i) =>{
			return ( <a href="#"
						className="btn btn-default left5 right5 hover"
						style={codeLetter}
						data-code={l}
						key={i}
						onClick={this.checkCode}>{l}</a>
					);
		});

		//TODO - sepearate the complex ones into classes.

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
			),
			(
				<div className="row" style={narrativeText}>
						<div className="col-xs-5 text-center">
							<img src={'/images/zombie/receptionist.png'} className='img-responsive top20' />
						</div>
						<div className="col-xs-7 top20">
							<h3>"A dual?"</h3>
							<p>The mechanical receptionst looks intrigued.</p>
							<p>Her gears start turning after gathering dust for decades.</p>
							<p>"What kind of dual?"</p>
							<div className="col-xs-4 text-center top20">
								<a href="#" className="btn btn-default" data-answer={0}  onClick={this.checkAnswer} >
									"To the Death!"
								</a>
							</div>

							<div className="col-xs-4 text-center top20">
								<a href="#" className="btn btn-default" data-answer={1} onClick={this.checkAnswer} >
									"Rock Paper Scissors!"
								</a>
							</div>

							<div className="col-xs-4 text-center top20">
								<a href="#" className="btn btn-default" data-answer={2}  onClick={this.checkAnswer} >
									"Nail Filing!"
								</a>
							</div>
						</div>
				</div>
			),
			(
				<div className="row" style={narrativeText}>
						<div className="col-xs-5 text-center">
							<img src={'/images/zombie/fist.png'} className='img-responsive' />
						</div>
						<div className="col-xs-7 top20">
							<p>The receptionist starts shaking her fist</p>
							<p>3...  2 ....</p>
							<p>1...</p>
							<h3>You throw: </h3>
							<div className="col-xs-4 text-center top20 hover hover-border">
								<a href="#" data-answer={0}  onClick={this.checkAnswer} >
									<img src={'/images/zombie/rock.png'} className='img-responsive' />
								</a>
							</div>

							<div className="col-xs-4 text-center top20 hover hover-border">
								<a href="#" data-answer={1} onClick={this.checkAnswer} >
									<img src={'/images/zombie/paper.png'} className='img-responsive' />
								</a>
							</div>

							<div className="col-xs-4 text-center top20">
								<a href="#" data-answer={2}  onClick={this.checkAnswer} >
									<img src={'/images/zombie/scissors.png'} className='img-responsive' />
								</a>
							</div>
						</div>
				</div>
			),
			(
				<div className="row">
					<div className="col-xs-12 text-center">
						<h2>Now to Unlock the Safe???</h2>
					</div>
					<div className="col-xs-6">
						<img src={'/images/zombie/panel_1.png'} className='img-responsive' />
					</div>
					<div className="col-xs-6">
						<img src={'/images/zombie/panel_2.png'} className='img-responsive' />
					</div>
					<div className="col-xs-12 text-center top20">
						<h4>Some kind of code...</h4>
						{codeArray}
					</div>
				</div>
			),
			(
				<div className="row">
					<div className="col-xs-12 text-center">
						<h2>You are now inside the lab! Do you remember which ingredients to pick up?</h2>
						<div className="col-xs-6 hover-border">
							<a href="#" data-flower={0} onClick={this.checkFlower} >
								<img src={'/images/zombie/flower1.png'} className='img-responsive' />
							</a>
						</div>
						<div className="col-xs-6">
							<div className="col-xs-3 hover-border">
								<a href="#" data-flower={1} onClick={this.checkFlower} >
									<img src={'/images/zombie/flower2.png'} className='img-responsive' />
								</a>
							</div>
							<div className="col-xs-3 hover-border">
								<a href="#" data-flower={2} onClick={this.checkFlower} >
									<img src={'/images/zombie/flower3.png'} className='img-responsive' />
								</a>
							</div>
							<div className="col-xs-3 hover-border">
								<a href="#" data-flower={3} onClick={this.checkFlower} >
									<img src={'/images/zombie/flower4.png'} className='img-responsive' />
								</a>
							</div>
							<div className="col-xs-12 hover-border">
								<a href="#" data-flower={4} onClick={this.checkFlower} >
									<img src={'/images/zombie/flower5.png'} className='img-responsive' />
								</a>
							</div>
						</div>
					</div>
				</div>
			)
		]
		this.setLength(questions.length);
		return questions[step];
	},

	checkFlower(e){
		e.preventDefault();
		let target = e.currentTarget;
		let thisFlower = parseInt(target.getAttribute("data-flower"));
		let flowersNeeded = this.state.flowersNeeded;
		let flowerIndex = flowersNeeded.indexOf(thisFlower);
		if(flowerIndex !== -1){
			flowersNeeded.splice(flowerIndex, 1);
			console.log("new Flowers Needed: ", flowersNeeded);


			this.setState({
				flowersNeeded: flowersNeeded
			});
			if(!flowersNeeded.length){
				this.props.onAnswer(true);
			}
		} else {
			this.props.onAnswer(false);
			return;
		}
	},


	checkCode(e){
		e.preventDefault();
		let answer = "fejf";
		let target = e.target;
		let thisCode = target.getAttribute("data-code");
		let currentCode = this.state.currentCode;
		currentCode += thisCode;
		console.log(currentCode);
		if(currentCode === answer){
			this.props.onAnswer(true);
			return;
		}
		if(answer.indexOf(currentCode) === 0){
			this.setState({
				currentCode: currentCode
			});
			return;
		} else {
			this.animateWrongAnswer(target);
			this.props.onAnswer(false);
			this.setState({
				currentCode: ""
			});
		}
	},

	checkAnswer(e){
		//TODO - these can be hashed so as not to be looked up.
		e.preventDefault();
		let target = e.currentTarget;
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
