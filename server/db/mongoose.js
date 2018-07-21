var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/Mongoose',{useNewUrlParser:true});

module.exports = { mongoose }; // exporting the object that's why it is surrounded by braces
