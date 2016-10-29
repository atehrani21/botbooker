const request = require('request');
const token = "EAAIvrP1hOZAoBACR8ZBGtWbfabj30jBhrvpEdqFa2jYTkurTQaaTCCl4ZADfKED6vSUmczhkZAAFupoI4D1kHZCmaBtsKDy8hasKN8om5hT8w9oJsqH3wU4y9rWs1scZBv146G5b6BaWZC8V8Yzqlf6byz12fkW9KTXZCRgZCK9SbDAZDZD";
const funcs = require('../db/functions');

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

  sendGenericMessage: function(sender, user) {
    funcs.getAvailabilityByName(user.split(' ')[0], user.split(' ')[1], function(err, availability){
      let messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [],
            }
          }
        }

        availability.forEach(function(availability) {
          messageData.attachment.payload.elements.push ({
              "title": availability.date,
              "subtitle": availability.time.time,
              "image_url": availability.img_url,
              "buttons": [{
                "type": "postback",
                "title": "Confirm",
                "payload": `CONFIRM_${availability.date}_${availability.time.time}_${availability.time.avail}`,
              }]
          });
        });

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
    });
  },

  sendQuickReplyMessage: function(sender) {
    funcs.getAvailableUsers(function(users) {
      let messageData = {
        "text": "Pick a hairstylist:",
        "quick_replies": []
      }
      users.forEach(function(user) {
        messageData.quick_replies.push({
          "content_type": "text",
          "title": `${user["firstname"]} ${user["lastname"]}`,
          "payload": `USERID_${user["id"]}`
        })
      });
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
    });
  }
}
