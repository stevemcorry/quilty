const functions = require('firebase-functions');


//for database:

const admin = require('firebase-admin');
admin.initializeApp();


const cors = require('cors')({
    //origin: true
    origin: '*',
    methods: ['GET','POST','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept','Access-Control-Allow-Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        return res.json("Hello from Firebase!");
    });
});

exports.getMessages = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const snapshot = admin.database().ref('/messages');
        return res.send(snapshot);
    });
});

exports.addMessage = functions.https.onRequest((req, res) => {

    cors(req, res, () => {
        const original = req.body.text;
        const snapshot = admin.database().ref('/messages').push({original: original});
        return res.send(snapshot);
    });

});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child('uppercase').set(uppercase);
});