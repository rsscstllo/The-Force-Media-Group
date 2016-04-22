/**
 * AdminPicture model events
 */

'use strict';

import {EventEmitter} from 'events';
var AdminPicture = require('./adminPicture.model');
var AdminPictureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdminPictureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  AdminPicture.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AdminPictureEvents.emit(event + ':' + doc._id, doc);
    AdminPictureEvents.emit(event, doc);
  }
}

export default AdminPictureEvents;
