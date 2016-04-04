'use strict';

var app = require('../..');
import request from 'supertest';

var newBookingFormNew;

describe('BookingFormNew API:', function() {

  describe('GET /api/bookingFormNews', function() {
    var bookingFormNews;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookingFormNews')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookingFormNews = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bookingFormNews.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bookingFormNews', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bookingFormNews')
        .send({
          name: 'New BookingFormNew',
          info: 'This is the brand new bookingFormNew!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBookingFormNew = res.body;
          done();
        });
    });

    it('should respond with the newly created bookingFormNew', function() {
      newBookingFormNew.name.should.equal('New BookingFormNew');
      newBookingFormNew.info.should.equal('This is the brand new bookingFormNew!!!');
    });

  });

  describe('GET /api/bookingFormNews/:id', function() {
    var bookingFormNew;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookingFormNews/' + newBookingFormNew._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookingFormNew = res.body;
          done();
        });
    });

    afterEach(function() {
      bookingFormNew = {};
    });

    it('should respond with the requested bookingFormNew', function() {
      bookingFormNew.name.should.equal('New BookingFormNew');
      bookingFormNew.info.should.equal('This is the brand new bookingFormNew!!!');
    });

  });

  describe('PUT /api/bookingFormNews/:id', function() {
    var updatedBookingFormNew;

    beforeEach(function(done) {
      request(app)
        .put('/api/bookingFormNews/' + newBookingFormNew._id)
        .send({
          name: 'Updated BookingFormNew',
          info: 'This is the updated bookingFormNew!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBookingFormNew = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBookingFormNew = {};
    });

    it('should respond with the updated bookingFormNew', function() {
      updatedBookingFormNew.name.should.equal('Updated BookingFormNew');
      updatedBookingFormNew.info.should.equal('This is the updated bookingFormNew!!!');
    });

  });

  describe('DELETE /api/bookingFormNews/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bookingFormNews/' + newBookingFormNew._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bookingFormNew does not exist', function(done) {
      request(app)
        .delete('/api/bookingFormNews/' + newBookingFormNew._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
