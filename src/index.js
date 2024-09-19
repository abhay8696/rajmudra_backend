const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: config.firebase.porjectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey,
    }),
    databaseURL: config.mongoose.url,
});

//Mongo connection and get the express app to listen on config.port
mongoose
    .connect(config.mongoose.url, {
        autoIndex: false,
    })
    .then(() => console.log("Connected to MongoDB, url:", config.mongoose.url));

app.listen(config.port, () => {
    console.log("Server started on port:", config.port);
});

exports.api = functions.https.onRequest(app);
