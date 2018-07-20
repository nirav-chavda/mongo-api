var mongoose = require('mongoose');

// Define a schema
// users : Name of the collection
var User = mongoose.model('users',{
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  isStudent: {
    type: Boolean,
    default: false
  },
  age: {
    type: Number,
    default: null
  }
});

module.exports = {User};
