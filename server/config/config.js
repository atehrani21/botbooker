const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/botbooker',
		rootPath: rootPath,
		port: process.env.PORT || 3000
	},
	production: {
		db: 'mongodb://admin:botbooker@ds041546.mlab.com:41546/botbooker',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}
