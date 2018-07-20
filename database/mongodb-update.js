const { MongoClient, ObjectId } = require('mongodb');

// we can easily create new db just by specifying the name . but it will create/shows only if it has data
MongoClient.connect('mongodb://127.0.0.1/TodoApp', (err, db) => {

  if(err) {
    return console.log(`Unable to connect server \n${err}`);   // return keyword will stop further execution
  }

  console.log('Connected to Server');

  db.collection('Todo').findOneAndUpdate({
    text: 'Something to do'
  } , {
    $set : {
      text : 'Something has happened'
    }
  } , {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    name: 'chavda'
  } , {
    $set: {
      name : 'raja'
    },
    $inc: {
      age: 2
    }
  } , {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();

});
