const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenum: String,
  email: String,
  img: String
});

module.exports = mongoose.model('User', schema);
