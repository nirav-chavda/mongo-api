const {ObjectId} =  require('mongodb');

var mongoose = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/Todo');

var id = "5b52f9db6381f64fb0a8d461";

if(!ObjectId.isValid(id)) {
  return console.log('Id is not valid');
}

Todo.find({
  'completedAt' : 123456
}).then((todo) => {
  console.log(JSON.stringify(todo, undefined, 2));
}, (e) => {
  console.log(e);
});

Todo.findById(id).then((todo) => {
  console.log(todo);
}).catch((e) => {
  console.log(e);
});
