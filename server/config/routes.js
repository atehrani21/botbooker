const bot = require('../bot/bot');

module.exports = function(app, config) {

  // Index route
  app.get('/', function (req, res) {
    res.send('hello world i am a secret bot');
  });

  // for facebook verification
  app.get('/webhook/', function (req, res) {
  	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
  		res.send(req.query['hub.challenge']);
  	}
  	res.send('Error, wrong token');
  });

  // to post data
  app.post('/webhook/', function (req, res) {
  	let messaging_events = req.body.entry[0].messaging
  	for (let i = 0; i < messaging_events.length; i++) {
  		let event = req.body.entry[0].messaging[i]
  		let sender = event.sender.id
  		if (event.message && event.message.text) {
  			let text = event.message.text
  			if (text === 'Generic') {
  				bot.sendGenericMessage(sender)
  				continue
  			}
  			bot.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
  			if (text === 'hi') {
  				bot.sendUniqueMessage(sender, "hi, i'm test bot, what can i do for you?")
  				continue
  			}
  			if (text === 'haircut') {
          bot.sendQuickReplyMessage(sender)
  				bot.sendUniqueMessage(sender, "There are 5 hair stylists available now.")
  				continue
  			}
  			if (text === 'Gordon Levitt') {
  				bot.sendUniqueMessage(sender, "You have selected Gordon. His available dates are x, y, z. please pick one")
  				continue
  			}
  			if (text === 'x' || 'y' || 'z') {
  				bot.sendUniqueMessage(sender, "You have selected " + text + " . Thank you!")
  			}
  		}
  		// if (event.postback) {
  		// 	let text = JSON.stringify(event.postback)
  		// 	bot.sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
  		// 	continue
  		// }
  	}
  	res.sendStatus(200)
  });
}
