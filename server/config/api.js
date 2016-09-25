var User = require('../models/user');
var Availability = require('../models/availability');

module.exports = function(app) {

  app.get('/api/get-users', function(req, res){
    User.find({})
        .exec(function(err, users){
          res.json(users);
        });
  });

  app.get('/api/get-avail/:user', function(req, res){
    Availability.find({'user': req.params.user})
                .exec(function(err, availability) {
                  res.json(availability);
                });
  });

  app.put('/api/update-user/:user', function(req,res){
    Availability.update({'user': req.params.user, 'date': req.body.date, 'time.time': req.body.time},
    {
        'time.avail': req.body.avail
    },
    function(err, availability) {
      res.end();
    });
  });
}
