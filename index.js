'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const app = express();
const config = require('./server/config/config')[env];

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Setup db and open connection
require('./server/config/mongoose')(config);

// Configure generic routes
require('./server/config/routes')(app, config);

// Configure api routes
require('./server/config/api')(app);

app.listen(config.port);
console.log(`Listening on port ${config.port}...`);
