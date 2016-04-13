/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird'); // Setting Mongoose's Promise implementation to Bluebird promises.
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express(); // Create Express App.
var server = http.createServer(app); // pass it to node core http lib.
require('./config/express').default(app); // configure express
require('./routes').default(app); // configure routes.

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// like setTimeout of 0, but faster
setImmediate(startServer);

// Expose app
exports = module.exports = app;
