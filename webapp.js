let express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let app = express();
let db;
let server;
app.use(express.static('static'));
app.use(bodyParser.json());


/*get all dudes*/
app.get('/api/sessions', (req, res) =>{
	let filter = {};
	// if(req.query.age){
	// 	filter.age = { $gte: parseInt(req.query.age) };
	// }
	// if(req.query.name){
	// 	let reg = /.*/;
	// 	filter.name = new RegExp(reg.source + req.query.name + reg.source, 'i');
	// }
	db.collection("sessions").find(filter).toArray((err, docs) => {
		res.json(docs);
	});
});

/*Get all posts made by dude*/
app.get('/api/posts/:dude_id', (req, res) => {
	let dude_id = req.params.dude_id;
	db.collection("post").find({dude_id : req.params.dude_id}).toArray((err, docs) => {
		res.json(docs);
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


/*Modify one dude */
app.put('/api/users/:id', (req, res) =>{
	let user = req.body;
	let oid = ObjectId(req.params.id);
	db.collection("users").updateOne({_id: oid}, user, (err, result) =>{
		db.collection("users").find({_id: oid}).next((err, doc) => {
			res.send(doc);
		});
	});
});

/*Create a dude*/
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
		});
	}
});


