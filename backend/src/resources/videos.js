const { Router } = require("express");
const { database } = require("../initialization/admin");
const { Response } = require("../shared/reponses");

const router = Router();
const videoCollection = database.collection("videos");

router.post("/", async (req, res) => {
	if(!req.userEmail) return res.status(400).send(Response.error("You must be logged in"));

	const title = req.body.title;
	const url = req.body.url;
	const description = req.body.description;
	const ownerEmail = req.userEmail;
	const timestamp = Date.now();

	if(!title) return res.status(400).send(Response.error("Invalid title"));
	if(!url) return res.status(400).send(Response.error("Invalid url"));
	if(!description) return res.status(400).send(Response.error("Invalid description"));

	if(ownerEmail !== "admin@codelab"){
		let userVideosCount = 0;
		const allVideosSnapshots = await videoCollection.get();
		allVideosSnapshots.forEach((snapshot) => {
			if(snapshot.data().ownerEmail === req.userEmail)
				userVideosCount++;
		});
		if(userVideosCount > 10)
			return res.status(400).send(Response.error("Cannot post more than 10 videos. Please delete some"));
	}

	let snapshot = await videoCollection.add({title, url, description, ownerEmail, timestamp})
	res.status(200).send(Response.success("ok", snapshot.id));
});

router.get("/", (req, res) => {
	videoCollection.get().then((snapshots) => {
		const videos = [];
		snapshots.forEach((snapshot)=>{
			const data = snapshot.data();
			data.id = snapshot.id;
			videos.push(data);
		});
		res.status(200).send(videos);
	});
});

router.get("/management", async (req, res) => {
	if(!req.userEmail) return res.status(400).send(Response.error("You must be logged in"));

	const videos = [];
	const snapshots = await videoCollection.get();
	snapshots.forEach((snapshot)=>{
		const data = snapshot.data();
		if(data.ownerEmail !== req.userEmail && req.userEmail !== "admin@codelab") return;
		data.id = snapshot.id;
		videos.push(data);
	});
	res.status(200).send(videos);
});

router.get("/:id", async (req, res) => {
	const videoId = req.params.id;
	if(!videoId) return res.status(400).send(Response.error("No video ID"));

	const snapshot = await videoCollection.doc(videoId).get()
	const data = snapshot.data();
	if(!data) return res.status(400).send(Response.error("Invalid Id"));
	data.id = snapshot.id;
	res.status(200).send(data);
});

router.delete("/:id", async (req, res) => {
	if(!req.userEmail) return res.status(400).send(Response.error("You must be logged in"));

	const videoId = req.params.id;
	if(!videoId) return res.status(400).send(Response.error("No video ID"));

	let videoSnapshot = await videoCollection.doc(videoId).get();

	if(!videoSnapshot.exists)
		return res.status(400).send(Response.error("Video does not exist"));
	if(videoSnapshot.data().ownerEmail !== req.userEmail && req.userEmail !== "admin@codelab")
		return res.status(400).send(Response.error("Not enough permissions"));

	await videoCollection.doc(videoId).delete();
	res.status(200).send(Response.success("ok"));
});

exports.router = router;