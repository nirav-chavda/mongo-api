const MongoClient = require('mongodb').MongoClient;

// we can easily create new db just by specifying the name . but it will create/shows only if it has data
MongoClient.connect('mongodb://127.0.0.1/TodoApp', (err, db) => {

  if(err) {
    return console.log(`Unable to connect server \n${err}`);   // return keyword will stop further execution
  }

  console.log('Connected to Server');

  db.collection('Todo').insertOne({
    'text' : 'Something to do'
  }, (err,res) => {
    if(err) {
      console.log(`Error while inserting data\n${err}`);
    } else {
      console.log(JSON.stringify(res.ops, undefined, 2));
    }
  });

  db.collection('Users').insertOne({
    '_id' : 112,
    'name' : "nirav",
    'age' : 10,
    'location' : "valsad"
  }, (err, res) => {
    if(err) {
      console.log(`Error while inserting data\n${err}`);
    } else {
      console.log(JSON.stringify(res.ops, undefined, 2));
    }
  });

  db.close();

});
