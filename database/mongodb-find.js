const { MongoClient, ObjectId } = require('mongodb');

// we can easily create new db just by specifying the name . but it will create/shows only if it has data
MongoClient.connect('mongodb://127.0.0.1/TodoApp', (err, db) => {

  if(err) {
    return console.log(`Unable to connect server \n${err}`);   // return keyword will stop further execution
  }

  console.log('Connected to Server');

  db.collection('Todo').find().toArray().then((document) => {
    console.log(JSON.stringify(document, undefined, 2));
  }, (err) => {
    console.log(`Unable to fetch data ${err}`);
  });

  db.collection('Todo').find({
    _id: new ObjectId('5b518353c4eac429a8f651ff')
  }).toArray().then((document) => {
    console.log(JSON.stringify(document, undefined, 2));
  }, (err) => {
    console.log(`Unable to fetch data ${err}`);
  });

  db.collection('Users').find().count().then((count) => {
    console.log(`Users count : ${count}`);
  }, (err) => {
    console.log(`Unable to fetch data ${err}`);
  });

  db.collection('Users').find({
    name: 'nirav'
  }).toArray().then((document) => {
    console.log(JSON.stringify(document, undefined, 2));
  }, (err) => {
    console.log(`Unable to fetch data ${err}`);
  });

  db.close();

});
