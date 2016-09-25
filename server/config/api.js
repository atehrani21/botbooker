const funcs = require('../db/functions');

module.exports = function(app) {

  app.get('/api/get-users', function(req, res){
    funcs.getAllUsers(function(err, users) {
      res.send(users);
    });
  });

  app.get('/api/get-avail/:user', function(req, res){
    funcs.getAvailability(req.params.user, function(err, availability) {
      res.send(availability);
    });
  });

  app.put('/api/update-user/:user', function(req,res){
    funcs.updateAvailability(
      req.params.user,
      req.body.date,
      req.body.time,
      req.body.avail,
      function(err, availability) {
        res.send({"status": 200});
      });
  });
}
