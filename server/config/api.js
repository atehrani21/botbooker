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

  app.get('/test', function(req,res) {
    funcs.getAvailableUsers(function(users) {
      let messageData = {
      "text": "Pick a hairstylist:",
      "quick_replies": []
      }
      console.log(users);
      users.forEach(function(user) {
        console.log(user);
        messageData.quick_replies.push({
          "content_type": "text",
          "title": `${user["firstname"]} ${user["lastname"]}`,
          "id": user["_id"],
          "payload": `DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_${user["firstname"].toUpperCase()}`
        })
      })
      res.send(messageData);
      //res.send(users);
    });
  })

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
