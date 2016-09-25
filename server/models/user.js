var mongoose = require('mongoose');

var schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenum: String,
  email: String
});

module.exports = mongoose.model('User', schema);
