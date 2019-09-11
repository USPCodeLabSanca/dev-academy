const functions = require("firebase-functions");
const express = require("express");
const process = require("process");
const videos = require("./resources/videos");
const users = require("./resources/user");
const bodyParser = require("body-parser");
const cors = require("cors");

const {validate, generateToken} = require("./shared/token");

const app = express();
app.use(bodyParser.json());
app.use(cors({exposedHeaders: ["refresh-token"]}));
app.use((req, res, next) => {
	let user = validate(req.headers.authorization);
	if(user){
		req.userEmail = user.email;
		const refreshToken = generateToken(user.email);
		res.setHeader("Refresh-Token", refreshToken);
	}
	next();
});

const isLocal = process.env.GCLOUD_PROJECT ? false : true;

app.use('/videos', videos.router);
app.use('/users', users.router);

if(isLocal){
	app.listen(3000, () => {
		console.log("Running in local environment. Port is 3000");
	});
}
else{
	exports.backend = functions.https.onRequest(app);
}