const request = require('request');
const token = "EAAC2cWwNCn4BANymEEllIfJfSOW9BGQ96LMwkUq0KVZB3PLI3dZBrQtusZBgPd66aXZBt36mZBwaTz0T3ZAyRFiMh7ZAQr5gYSScB0CR36LQ5mNH733WtxgRS2NQVThoPCX7VjrZBtY39MTwE4K4m7hwTxG97UjSVo2vurTKytqWuwZDZD";
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
                "payload": "Payload for first element in a generic bubble",
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
