const mongoose = require('mongoose');

module.exports = function(config){

	require('../db/seed')(config);
}
