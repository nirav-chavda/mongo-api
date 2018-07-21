const express = require('express');
const bodyParser = require('body-parser');

var {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var port = process.env.PORT || 3000;

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

app.get('/todos', (req,res) => {
  Todo.find().then((docs) => {
    if(!docs) {
      res.status(404).send();
    }
    res.status(200).send({docs});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.get('/todos/:id', (req,res) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(404).send();
  }
  Todo.findById(req.params.id).then((todo) => {
    if(!todo) {
        res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {app};
