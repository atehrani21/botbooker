const mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.connect(config.db);

	let db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection error...'));

	db.once('open', function callback() {
    console.log('db botbooker opened');
		mongoose.connection.db.dropCollection('users');
		mongoose.connection.db.dropCollection('availabilities');

		// Insert test data
		var User = require('../models/user');
		var Availability = require('../models/availability');

		var user1 = new User({
			firstname: "John",
			lastname: "Doe",
			phonenum: "0123456789",
			email: "jDoe123@gmail.com",
			img: "https://media.timeout.com/images/102805001/image.jpg"
		});
		user1.save(function(err, user) { user1.id = user.id});

		Availability.create({
			user: user1.id,
			date: Date.now(),
			time:
				{
					time: "10:00",
					avail: true
				},
			img_url: "https://media.timeout.com/images/102805001/image.jpg"
		});
  });

}
