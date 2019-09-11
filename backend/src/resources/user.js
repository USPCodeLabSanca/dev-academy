const { Router } = require("express");
const { database } = require("../initialization/admin");
const { generateToken } = require("../shared/token");
const { Response } = require("../shared/reponses");

const bcrypt = require("bcrypt");

const router = Router();
const usersCollection = database.collection("users");

router.post("/", async (req, res) => {
	return res.status(400).send(Response.error("Registration is currently disabled."));

	const email = req.body.email;
	const password = req.body.password;

	if(!email) return res.status(400).send(Response.error("Invalid email"));
	if(!password) return res.status(400).send(Response.error("Invalid password"));

	if((await usersCollection.doc(email).get()).exists)
		return res.status(400).send(Response.error("user already exists"));

	const hashed = await bcrypt.hash(password, 10);
	await usersCollection.doc(email).set({password: hashed});
	const token = generateToken(email);
	res.status(200).send({token});
});

router.get("/", async (req, res) => {
	const snapshots = await usersCollection.get();
	const users = [];
	snapshots.forEach(snapshot => users.push(snapshot.id));
	res.status(200).send({users});
});

router.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if(!email) return res.status(400).send(Response.error("Invalid email"));
	if(!password) return res.status(400).send(Response.error("Invalid password"));

	const user = await usersCollection.doc(email).get();
	if(!user.exists) return res.status(400).send(Response.error("invalid credentials"));

	const hashed = user.data().password;
	if(!await bcrypt.compare(password, hashed))
		return res.status(400).send(Response.error("invalid credentials"));

	const token = generateToken(email);
	res.status(200).send({token});
});

exports.router = router;