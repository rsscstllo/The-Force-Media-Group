'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AdminPictureSchema = new mongoose.Schema({
  url: String,
  name: String
});

export default mongoose.model('AdminPicture', AdminPictureSchema);
