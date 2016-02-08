'use strict';

var express = require('express');
var controller = require('./eztexting.controller');

var router = express.Router();

router.route('/sendConfirmationMessage/:phoneNumber')
  .get(controller.sendConfirmationMessage);

router.route('/createContact/:phoneNumber')
  .get(controller.createContact);

router.route('/sendTextToGroup/:messageText')
  .get(controller.sendTextToGroup);

module.exports = router;
