/**
 * BookingFormNew model events
 */

'use strict';

import {EventEmitter} from 'events';
var BookingFormNew = require('./bookingFormNew.model');
var BookingFormNewEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookingFormNewEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  BookingFormNew.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BookingFormNewEvents.emit(event + ':' + doc._id, doc);
    BookingFormNewEvents.emit(event, doc);
  }
}

export default BookingFormNewEvents;
