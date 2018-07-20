const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
//var port = process.env.PORT;

var app = express();

app.use(bodyParser.json());  // returns the middleware that parses body (req.body) into json only where content-type matches json

app.post('/todos', (req,res) => {
  var todo = new Todo({
    'text': req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
