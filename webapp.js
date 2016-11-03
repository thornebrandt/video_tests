let express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let app = express();
let db;
let server;
app.use(express.static('static'));
app.use(bodyParser.json());

/*Get all logs for a user */
app.get('/api/:user_id/logs/', (req, res) => {
	db.collection("logs").find({user_id : req.params.user_id}).toArray((err, docs) => {
		res.json(docs);
	});
});

/*get all logs*/
app.get('/api/logs', (req, res) =>{
	let filter = {};
	if(req.query.type){
		filter['test.type'] = req.query.type;
	}
	if(req.query.test){
		filter['test.id'] = req.query.test;
	}
	if(req.query.age){
		filter.age = req.query.age
	}
	db.collection("logs").find(filter).toArray((err, docs) => {
		res.json(docs);
	});
});

/*Create a log*/
app.post('/api/logs', (req, res) => {
	let newLog = req.body;
	db.collection("logs").insertOne(newLog, (err, result) => {
		let newID = result.insertedId;
		db.collection("logs").find({_id: newID}).next((err, doc) => {
			res.json(doc);
		});
	});
});

/* Save a session and logs */
app.post('/api/session', (req, res) => {
	let newPost = req.body;
	db.collection("sessions").insertOne(newPost, (err, result) => {
		let newID = result.insertedId;
		db.collection("sessions").find({_id: newID}).next((err, doc) => {
			//then insert the logs.
			res.json(doc);
		});
	});
});

/*search for one user*/
app.get('/api/users/find/:name', (req, res) => {
	var regex = new RegExp(["^", req.params.name, "$"].join(""), "i");
	db.collection("users").findOne({ name: regex }, (err, doc) => {
		res.json(doc);
	});
});

/*search for user exactly*/
app.get('/api/users/:name', (req, res) => {
	db.collection("users").findOne({ name: req.params.name }, (err, doc) => {
		res.json(doc);
	});
});

/*Modify one user */
app.put('/api/users/:id', (req, res) =>{
	let user = req.body;
	let oid = ObjectId(req.params.id);
	db.collection("users").updateOne({_id: oid}, user, (err, result) =>{
		db.collection("users").find({_id: oid}).next((err, doc) => {
			res.send(doc);
		});
	});
});

/*Create a user*/
app.post('/api/users', (req, res) => {
	let newUser = req.body;
	db.collection("users").insertOne(newUser, (err, result) => {
		let newID = result.insertedId;
		db.collection("users").find({_id: newID}).next((err, doc) => {
			res.json(doc);
		});
	});
});

/*Using PushState*/
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/static/index.html');
});

MongoClient.connect('mongodb://localhost/video_tests', (err, dbConnection) => {
	db = dbConnection;
	if(err){
		console.log(err);
		console.log("---");
		console.log("Hey... you! Did you read the README of the github? Did you install MongoDB on your system?");
		console.log("---");
		console.log("type 'mongo --version' to check if it is installed");
		console.log("^")
		console.log("^^^")
		console.log("^^^^^")
		console.log("^^^^^^^")
		console.log("^^^^^^^^^^");
		console.log("^^^^^^^^^^^^");
		console.log("^^^^LOOK^^^^^");
		console.log("^^^^^^^^^^^^^^^");
		console.log(" If it is installed, it needs to be running, via: 'npm run mongo' ");
	} else {
		server = app.listen(3000, () =>{
			let port = server.address().port;
			console.log("Server started at port: ", port);
			console.log("Thanks for installing mongo! ;)");
			console.log("-----");
			console.log("Don't just stand there! Open up http://localhost:3000/ in Chrome");
		});
	}
});


