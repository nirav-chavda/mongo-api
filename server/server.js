var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1/Mongoose');

// Define a schema
// todo : Name of the collection
var Todo = mongoose.model('todo',{
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var newTodo = new Todo({
  text : 'Second Document',
  completed : true,
  completedAt : 123456
});

// var newTodo = new Todo({
//   text : '    Second Document   ',
// });

newTodo.save().then((doc)=> {
  console.log('Saved Doc',JSON.stringify(doc, undefined, 2));
}, (err)=> {
  console.log(`Unable to save \n${err}`);
});
