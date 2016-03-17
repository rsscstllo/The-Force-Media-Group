/**
 * ThemeColor model events
 */

'use strict';

import {EventEmitter} from 'events';
var ThemeColor = require('./themeColor.model');
var ThemeColorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThemeColorEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ThemeColor.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ThemeColorEvents.emit(event + ':' + doc._id, doc);
    ThemeColorEvents.emit(event, doc);
  }
}

export default ThemeColorEvents;
