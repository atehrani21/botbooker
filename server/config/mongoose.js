const mongoose = require('mongoose');

module.exports = function(config){
	
	mongoose.connect(config.db);

	let db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection error...'));

	db.once('open', function callback() {
    console.log('db botbooker opened');
  });
}
