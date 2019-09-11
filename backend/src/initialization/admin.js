const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert("firebase-authentication.json"),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
const database = admin.firestore();

exports.admin = admin;
exports.database = database;