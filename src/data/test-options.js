const test_options = {
	videos: {
		'mathnet': {
			id: 'mathnet',
			title: 'Mathnet',
			url: 'myhppg70ljI',
			description: "Highly produced PBS clip from 90's about Math Crimes.",
			style: {
				background: '#82CFFD',
				borderRadius: '5px',
				color: '#483D8B'
			},
			challenges: {
				timer: {
					id: "timer",
					description: "15 min. total time limit.",
					limit: 900000
				},
				plays: {
					id: "plays",
					description: "Only 3 plays allowed.",
					limit: 3
				},
				none: {
					id: "none",
					description: "No time limit.",
					limit: 0
				}
			}
		},
		'zombie' : {
			id: 'zombie',
			title: 'Zombie Antidote*',
			url: 'eLErzsFy6I4',
			description: "Cartoon plea to prevent human extinction against zombie uprising.",
			suggested: true,
			style: {
				background: '#1B5E20',
				color: '#C5E3BF',
				borderRadius: '5px'
			},
			challenges: {
				timer: {
					description: "3 minute video. 6 minute time limit.",
					limit: 360000,
					id: "timer"
				},
				plays: {
					description: "Only 3 video plays allowed.",
					limit: 3,
					id: "plays"
				},
				none: {
					description: "No time limit.",
					limit: 0,
					id: "none"
				}
			}
		}
	},
	types: {
		standard : {
			title : 'Standard',
			description : 'Standard multiple choice. (Control)',
			length: 3,
			style: {
				background: '#CCCCCC',
				color: 'black',
				borderRadius: '5px'

			}
		},
		narrative: {
			title: 'Narrative*',
			length: 3,
			description: 'Become part of the plot. Visual Puzzles. Save characters.',
			style: {
				background: '#c0392b',
				color: '#ecf0f1',
				borderRadius: '5px'
			}
		}
	},
	challenges: {
		none: {
			title: 'None',
			description: 'No limitations. (Control)',
			style: {
				background: '#F9FBE7',
				color: 'black',
				borderRadius: '5px'
			}
		},
		'timer': {
			title: 'Timed Challenge',
			minutes: 10,
			description: "You can rewatch the video, but you might run out of time",
			style: {
				background: '#3498db',
				color: 'white',
				borderRadius: '5px'
			}
		},
		'plays': {
			title: 'Limited Plays*',
			description: 'Video can be only be opened a limited number of times.',
			plays: 3,
			style: {
				background: '#9E9D24',
				color: '#E6EE9C',
				borderRadius: '5px'
			}
		}
	},
	options: {
		notes: true,
		scrubbing: true
	}
}

module.exports = test_options;