const test_questions = {
	mathnet : {
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
		]
	},
	zombie: {
		questions: [
			"What is the largest flower in the world?",
			"How did the Corpse Flower get it's name?",
			"What would you play next if you just beat the robot's first round?",
		],

		choices: [
			[
				"Elephant Flower",
				"Corpse Flower",
				"Spanish Dagger",
			],
			[
				"It smells like rotting flesh",
				"It looks like a corpse",
				"It grows on or around corpses",
			],
			[
				"Rock",
				"Paper",
				"Scissors",
			]
		],

		answers: [
			1,
			0,
			2
		]
	},
}

module.exports = test_questions;