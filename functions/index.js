const functions = require('firebase-functions');

const axios = require('axios');
const cheerio = require('cheerio');

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

exports.addMessage = functions.https.onRequest((req, res) => {

    cors(req, res, () => {
        const original = req.body.text;
        const snapshot = admin.database().ref('/messages').push({original: original});
        return res.send(snapshot);
    });

});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
        const original = snapshot.val();
        console.log('Uppercasing', context.params.pushId, original);
        const uppercase = original.toUpperCase();
        return snapshot.ref.parent.child('uppercase').set(uppercase);
});


exports.scrape = functions.https.onRequest((req, res) => {

    cors(req, res, () => {

        const url = req.body.url;
        axios.get(url).then(response=>{
            let data = response.data;
            const $ = cheerio.load(data);
            var dataArr = [];
            $('div.search-result-listview-items search-result-listview-item').each((i,elem) => {
                dataArr.push({
                    title: $(elem).text(),
                    link : $(elem).find('a.storylink').attr('href')
                });
            });
            var obj = {
                html: data,
                title: "TITLE",
                cheer: dataArr
            };
            return res.send(obj);
        })
        .catch(error=>{
            console.log('error',error)
            return res.send(error);
        })
    });


});
