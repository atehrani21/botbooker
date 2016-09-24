const express = require('express');

const env = process.env.NODE_ENV || 'development';
const app = express();
const config = require('./server/config/config')[env];

require('./server/config/mongoose')(config);

app.listen(config.port);
console.log(`Listening on port ${config.port}...`);
