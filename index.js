'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const app = express();
const config = require('./server/config/config')[env];

// Setup db and open connection
require('./server/config/mongoose')(config);

// Configure routes
require('./server/config/routes')(app, config);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(config.port);
console.log(`Listening on port ${config.port}...`);
