let React = require('react');
const moment = require('moment');


let UserCreation= React.createClass({
	getInitialState(){
		return {
			user: this.props.user
		}
	},

	render(){
		return (
			<div>
				{!this.state.user && !this.state.foundUser && <UserAdd addUser={this.addUser}/>}
				{this.state.foundUser && <CheckUser foundUser={this.state.foundUser} addUser={this.addUser} useFoundUser={this.useFoundUser} />}
				{this.state.user && !this.state.age && <AgeAdd addAge={this.addAge} user={this.state.user} />}
			</div>
		)
	},

	componentDidUpdate(){
		if(this.state.user && this.state.user_id){
			this.props.getUser(this.state.user);
		}
	},

	addUser(user){
		this.getUser(user.name)
		.then((foundUser) => {
			if(foundUser){
				this.setState({
					foundUser: foundUser
				});
			} else {
				this.setState({
					foundUser: null,
					user: user
				});
			}
		});
	},

	useFoundUser(){
		let user = this.state.foundUser;
		let age = this.state.foundUser.age;
		this.setState({
			foundUser: null,
			user: user,
			user_id: user._id,
			age: age
		});
		let self = this;
	},

	addAge(agedUser){
		let user = this.state.user;
		user.age = agedUser.age;
		return fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((response) => response.json())
		.then((data) => {
			let user = data;
			this.setState({
				user: user,
				user_id: user._id,
				age: user.age
			});
		})
		.catch((error) => {
			console.log('error creating user: ', error);
		});
	},


	getUser(name){
		return fetch('/api/users/' + name)
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.log("can't find dude", error);
		});
	}

});

let AgeAdd = React.createClass({
	render(){
		return(
			<form name="addAgeForm" onSubmit={this.onAddAge} >
				<div className="row top100">
					<div className="col-xs-12">
						<span className=
						'large-text'>
							...and how <strong>old</strong> are you, <strong>{this.props.user.name}</strong>?
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-10">
						<input type="text" className="form-control" name="age" type="number"
						placeholder="e.g. 12" min="2" max="175" autoComplete="off" required />
					</div>
					<div className="col-xs-2">
						<button className="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		)
	},

	onAddAge(e){
		e.preventDefault();
		let form = document.forms.addAgeForm;
		this.props.addAge({
			age: form.age.value,
		});
	}
});



let UserAdd = React.createClass({
	render(){
		return(
			<form name="addUserForm" onSubmit={this.onAddUser}>
				<div className="row top50">
					<div className="col-xs-12">
						<span className='large-text'>Before we begin, what is your <b>name</b>?</span>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-10">
						<input type="text" className="form-control" name="name" placeholder="Name: " autoComplete="off" required />
					</div>
					<div className="col-xs-2">
						<button className="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		)
	},

	onAddUser(e){
		e.preventDefault();
		let form = document.forms.addUserForm;
		this.props.addUser({
			name: form.name.value,
			created: new Date()
		});
	}
});


let CheckUser = React.createClass({
	render(){
		let ago = new moment(this.props.foundUser.created).fromNow();
		return(
			<div className="row top100">
				<div className="col-xs-12">
					<span className='large-text'><strong>{this.props.foundUser.name}</strong>, are you <strong>{this.props.foundUser.age} years old</strong>, and did you sign up <strong>{ago}</strong> ?</span>
				</div>
				<div className="row">
					<div className="col-xs-3">
						<button className="btn btn-success" onClick={this.props.useFoundUser}>Yep, That's Me!</button>
					</div>
					<form name="addUserForm" className="col-xs-6 pull-right" onSubmit={this.onAddUser}>
						<div className="col-xs-9">
							<input type="text" className="form-control" name="name" placeholder="No, I'll try a different name: " autoComplete="off" required />
						</div>
						<div className="col-xs-2">
							<button className="btn btn-warning">New Login</button>
						</div>
					</form>
				</div>
			</div>
		);
	},

	onAddUser(e){
		e.preventDefault();
		let form = document.forms.addUserForm;
		this.props.addUser({
			name: form.name.value,
			created: new Date()
		});
	},

});

module.exports = UserCreation;