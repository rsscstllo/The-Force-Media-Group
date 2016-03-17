'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThemeColorSchema = new mongoose.Schema({
  name: String,
  colorCode: String
});

export default mongoose.model('ThemeColor', ThemeColorSchema);
