var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  date: Date,
  times: [{
      time: String,
      avail: Boolean
    }]
});

module.exports = mongoose.model('Availabilty', schema);
