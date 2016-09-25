var User = require('../models/user');
var Availability = require('../models/availability');

module.exports = {
  getAllUsers: function(callback) {
    User.find({})
    .exec(function(err, users){
      callback(err,users);
    });
  },

  getAvailableUsers: function(callback) {
    let users = [];
    Availability.find({'time.avail': true}, function(err, availabilities) {
      for(var avail in availabilities) {
        Users.find({'id': avail.user}, function(err, user) {
          users.push(user);
        })
      }
      callback(users.length);
    })
  },

  getAvailability: function(user, callback) {
    Availability.find({'user': user})
    .exec(function(err, availability) {
      callback(err, availability);
    });
  },

  updateAvailability: function(user, date, time, avail, callback) {
    Availability.update({
      'user': user,
      'date': date,
      'time.time': time
    },
    {
      'time.avail': avail
    },
    function(err, availability) {
      callback(err, availability);
    });
  }
}
