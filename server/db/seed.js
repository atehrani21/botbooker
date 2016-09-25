const seeder = require('mongoose-seed');
const mongoose = require('mongoose');
const config = require('../config/config')['development'];

const user1id = mongoose.Types.ObjectId();
const user2id = mongoose.Types.ObjectId();
const user3id = mongoose.Types.ObjectId();
const user4id = mongoose.Types.ObjectId();

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
                "_id": user1id,
                "firstname": "John",
                "lastname": "Doe",
                "phonenum": "1234567890",
                "email": "jdoe123@salon.com",
                "img": "http://michaelanthonysalondc.com/wp-content/uploads/2014/03/2014-02-19-12.55.39.jpg"
            },
            {
                "_id": user2id,
                "firstname": "Heather",
                "lastname": "Greene",
                "phonenum": "1435933843",
                "email": "hgreene123@salon.com",
                "img": "http://i2.wp.com/www.thekinkteamblog.com/wp-content/uploads/2015/04/woman-hair-stylist.jpg"
            },
            {
                "_id": user3id,
                "firstname": "Sarah",
                "lastname": "Hathaway",
                "phonenum": "2938471039",
                "email": "shathaway123@salon.com",
                "img": "https://www.insurebodywork.com/media/image/cms/media/hair-stylist.jpg"
            },
            {
                "_id": user4id,
                "firstname": "Nancy",
                "lastname": "Drew",
                "phonenum": "4839290934",
                "email": "ndrew123@salon.com",
                "img": "http://media.gettyimages.com/photos/beautician-with-hair-dryer-in-salon-smiling-portrait-elevated-view-picture-id200193201-001?k=6&m=200193201-001&s=170667a&w=0&h=CzmGjKY8L8HCR6SJHjCwMMWY6Jr_fofsovajYWahLOQ="
            }
        ]
    },
    {
      'model': 'Availability',
      'documents': [
        {
          "user": user1id,
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
