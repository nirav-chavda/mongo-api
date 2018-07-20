const { MongoClient, ObjectId } = require('mongodb');

// we can easily create new db just by specifying the name . but it will create/shows only if it has data
MongoClient.connect('mongodb://127.0.0.1/TodoApp', (err, db) => {

  if(err) {
    return console.log(`Unable to connect server \n${err}`);   // return keyword will stop further execution
  }

  console.log('Connected to Server');

  //  Delete more than one records for the match result
  db.collection('Todo').deleteMany({text: 'Something to do'}).then((result) => {
    console.log(result);
  });

  //  Delete one record for the match result
  db.collection('Users').deleteOne({name: 'raj'}).then((result) => {
    console.log(result);
  });

  //  Delete one record for the match result and return the boject of deleted record
  db.collection('Users').findOneAndDelete({name: 'nirav'}).then((result) => {
    console.log(result);
  });

  db.close();

});
