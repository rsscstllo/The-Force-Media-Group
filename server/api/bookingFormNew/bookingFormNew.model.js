'use strict';

import mongoose from 'mongoose';

var BookingFormNewSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('BookingFormNew', BookingFormNewSchema);
