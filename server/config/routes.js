const bot = require('../bot/bot');

module.exports = function(app, config) {

	// Index route
	app.get('/', function(req, res) {
		//res.sendFile(config.rootPath + '/public/index.html');
	});

	// for Facebook verification
	app.route('/webhook/')
		.get(function (req, res) {
	    if (req.query['hub.verify_token'] === '0ber88399fllgjh8') {
	        res.send(req.query['hub.challenge']);
	    }
	    res.send('Error, wrong token');
		})
		.post(function (req,res) {
			let messaging_events = req.body.entry[0].messaging;
	    for (let i = 0; i < messaging_events.length; i++) {
	      let event = req.body.entry[0].messaging[i];
	      let sender = event.sender.id;
	      if (event.message && event.message.text) {
	        let text = event.message.text;
	        if (text === 'Generic') {
	            bot.sendGenericMessage(sender);
	            continue;
	        }
	        bot.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
	      }
	      if (event.postback) {
	        let text = JSON.stringify(event.postback);
	        bot.sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token);
	        continue;
	      }
	    }
	    res.sendStatus(200);
		});

}
