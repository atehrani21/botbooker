const token = "EAAZANR29Wi50BAPU2KL6x4KE6ZCoIJPGdPfvw2s4RftBNOj97JzAD48ytOSNGlk4fZCAeZAzc9rUWW2COrhnRCa7tMuoA7HEHPJHiVqOJL7UK1omlUS2lZANiGAkKtJ99ZCIRBVqNOPXYpgDbxztAa63PtYYgIkIr7eYDRU2Y7LQZDZD";
const request = require('request');

module.exports = {

  sendTextMessage: function(sender, text) {
    let messageData = {
      text: text
    }

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: token
      },
      method: 'POST',
      json: {
        recipient: {
          id: sender
        },
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  },

  sendUniqueMessage: function(sender, text) {
    let messageData = {
      text: text
    }

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: token
      },
      method: 'POST',
      json: {
        recipient: {
          id: sender
        },
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  },

  sendGenericMessage: function(sender) {
    let messageData = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "First card",
            "subtitle": "Element #1 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
            "buttons": [{
              "type": "web_url",
              "url": "https://www.messenger.com",
              "title": "web url"
            }, {
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for first element in a generic bubble",
            }],
          }, {
            "title": "Second card",
            "subtitle": "Element #2 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
            "buttons": [{
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for second element in a generic bubble",
            }],
          }]
        }
      }
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: token
      },
      method: 'POST',
      json: {
        recipient: {
          id: sender
        },
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  },

  sendQuickReplyMessage: function(sender) {
    {
      let messageData = {
        "text": "Pick a hairstylist:",
        "quick_replies": [{
          "content_type": "text",
          "title": "Jane Lyliana",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_JANE"
        }, {
          "content_type": "text",
          "title": "Gordon Levitt",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GORDON"
        }, {
          "content_type": "text",
          "title": "Mike Mang",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_MIKE"
        }, {
          "content_type": "text",
          "title": "Lulu Lex",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_LULU"
        }]
      }
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: token
        },
        method: 'POST',
        json: {
          recipient: {
            id: sender
          },
          message: messageData,
        }
      }, function(error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error)
        } else if (response.body.error) {
          console.log('Error: ', response.body.error)
        }
      })
    }
  }
}
