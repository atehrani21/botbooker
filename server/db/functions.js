var User = require('../models/user');
var Availability = require('../models/availability');
var mongoose = require('mongoose');

module.exports = {
  getAllUsers: function(callback) {
    User.find({})
    .exec(function(err, users){
      callback(err,users);
    });
  },

  getAvailableUsers: function(callback) {
    let users = [];
    Availability.find({'time.avail': true}).distinct('user', function(err, availabilities) {
      User.find({'_id': { $in: availabilities.map(function(o){ return mongoose.Types.ObjectId(o); }) }})
      .exec(function(err, users) {
         callback(users);
      });
    });
  },

  getAvailability: function(user, callback) {
    Availability.find({'user': user})
    .exec(function(err, availability) {
      callback(err, availability);
    });
  },

  getAvailabilityByName: function(firstname, lastname, callback) {
    //console.log("first name: "+ firstname, lastname);
    User.findOne({'firstname': firstname, 'lastname': lastname})
    .exec(function(err, user) {

        Availability.find({'user': user.id})
        .exec(function(err, availability) {
          callback(err, availability);
        });

    });

  },

  updateAvailability: function(user, date, time, avail, callback) {
    User.findOne({'firstname': user.split(' ')[0], 'lastname': user.split(' ')[1]})
    .exec(function(err, user) {
        Availability.update({
          'user': user.id,
          'date': date,
          'time.time': time
        },
        {
          'time.avail': avail
        },
        function(err, availability) {
          callback(err, availability);
        });
    });
  }
}
