'use strict';

var express = require('express');
var controller = require('./bookingForm.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/', controller.sendBookingEmail);

module.exports = router;
