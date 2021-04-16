var mongoClient = require('mongodb').MongoClient
const fs = require('fs');
mongoClient.connect('mongodb://localhost:27017', function(err,client) {
   
    if (err) throw err;
    console.log("Connected to Database");
    fs.readFile("call_data.json",function (err,data) {
        if (err) {
          return console.log(err);
        }
        let document = JSON.parse(data)
        console.log(document);
        let db = client.db("meanstack");
        db.collection('test').insert(document, function(err, records) {
            if (err) throw err;
            console.log("Record added as " + records);
        });
      });

   
});