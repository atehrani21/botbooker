const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: String,
  time: {
      time: String,
      avail: Boolean
  },
  img_url: String
});

module.exports = mongoose.model('Availability', schema);
