const seeder = require('mongoose-seed');
const config = require('../config/config')['development'];

// Connect to MongoDB via Mongoose
seeder.connect(config.db, function() {
    // Load Mongoose models
    seeder.loadModels([
        'server/models/availability.js',
        'server/models/user.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Availability', 'User'], function() {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function(){
            process.exit(1);
        });

    });
});

// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'User',
        'documents': [
            {
                "firstname": "John",
                "lastname": "Doe",
                "phonenum": "1234567890",
                "email": "foo@bar.com",
                "img": "http://michaelanthonysalondc.com/wp-content/uploads/2014/03/2014-02-19-12.55.39.jpg"
            }
        ]
    },
    {
      'model': 'Availability',
      'documents': [
        {
          "user": null,
          "date": 1474803107658,
          "time": {
             "time": "11:00",
             "avail": true
          },
          "img_url": "http://www.yellowpages.com.au/content/articles/headings/images/hairdressers-thumbnail.jpg"
        }
      ]
    }
];
