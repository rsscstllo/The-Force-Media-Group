/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bookingFormNews              ->  index
 * POST    /api/bookingFormNews              ->  create
 * GET     /api/bookingFormNews/:id          ->  show
 * PUT     /api/bookingFormNews/:id          ->  update
 * DELETE  /api/bookingFormNews/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import BookingFormNew from './bookingFormNew.model';
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of BookingFormNews
export function index(req, res) {
  return BookingFormNew.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single BookingFormNew from the DB
export function show(req, res) {
  return BookingFormNew.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new BookingFormNew in the DB
export function create(req, res) {
  return BookingFormNew.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing BookingFormNew in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return BookingFormNew.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a BookingFormNew from the DB
export function destroy(req, res) {
  return BookingFormNew.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
/*
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'forcemediagroupdb@gmail.com',
            clientId: '1049619144734-uun0kb3kebr8coi3jrs3aqgp17gfcop8.apps.googleusercontent.com',
            clientSecret: '-iNcYB0V2sStaADp3zOrQ3L3',
            refreshToken: '1/HXOOpKwTS3-oztzSxIwcMTph5awFSpkp-UUtuZRAJM0MEudVrK5jSpoR30zcRFq6',
            accessToken: 'ya29.pwLTEs8BGzTkM1MZE1S40NMp_732Y1aSyVlcqv1iPz0aIyhfT7MIYUzS2HHPio3m2Q'
        })
    }
});
// setup e-mail data with unicode symbols


transporter.auth.xoauth2.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken);
})
*/


var generator = xoauth2.createXOAuth2Generator({
    user: 'forcemediagroupdb@gmail.com',
    clientId: '1049619144734-pqo3hkf4dr5eomguc3c69opnsbcaasd4.apps.googleusercontent.com',
    clientSecret: 'dKIQNFX4aN_GwZtr0MhAI1wA',
    refreshToken: '1/i_43lVYBgH_BFeIJfnZ_b8KJbva39ZZbsKoTHymqXNoMEudVrK5jSpoR30zcRFq6',
    access_type: 'offline'
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

// send mail

export function sendBookingEmail(req, res){
  console.log(req.body);
  transporter.sendMail({
    from: 'forcemediagroupdb@gmail.com', // sender address
    to: 'mrdjmeyers@gmail.com', // list of receivers
    subject: 'New Booking Request', // Subject line
    text: 'Requester Name: ' + req.body.propName + '\nRequester Email: ' + req.body.email + '\nRequester Phone: ' + req.body.phoneNum + '\nEvent Type: ' + req.body.eventType + '\nEvent Description: ' + req.body.descript + '\nEvent Date/Time: ' + req.body.eventDate// plaintext body
  }, function(error, response) {
     if (error) {
          console.log(error);
     } else {
          console.log('Message sent');
     }
  });

/*
  var mailOptions = {
    from: 'forcemediagroupdb@gmail.com', // sender address
    to: 'mrdjmeyers@gmail.com', // list of receivers
    subject: 'New Booking Request', // Subject line
    text: 'Requester Name: ' + req.params.propName + '\nRequester Email: ' + req.params.email + '\nRequester Phone: ' + req.params.phoneNum + '\nEvent Type: ' + req.params.eventType + '\nEvent Description: ' + req.params.descript + '\nEvent Date/Time: ' + req.params.eventDate// plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      res.send(error);
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.send(mailOptions);
  });
  */
}
