'use strict';

var app = require('../..');
import request from 'supertest';

var newAdminPicture;

describe('AdminPicture API:', function() {

  describe('GET /api/adminPictures', function() {
    var adminPictures;

    beforeEach(function(done) {
      request(app)
        .get('/api/adminPictures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adminPictures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      adminPictures.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/adminPictures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/adminPictures')
        .send({
          name: 'New AdminPicture',
          url: 'http://www.google.com/'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAdminPicture = res.body;
          done();
        });
    });

    it('should respond with the newly created adminPicture', function() {
      newAdminPicture.name.should.equal('New AdminPicture');
      newAdminPicture.url.should.equal('http://www.google.com/');
    });

  });

  describe('GET /api/adminPictures/:id', function() {
    var adminPicture;

    beforeEach(function(done) {
      request(app)
        .get('/api/adminPictures/' + newAdminPicture._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adminPicture = res.body;
          done();
        });
    });

    afterEach(function() {
      adminPicture = {};
    });

    it('should respond with the requested adminPicture', function() {
      adminPicture.name.should.equal('New AdminPicture');
      adminPicture.url.should.equal('http://www.google.com/');
    });

  });

  describe('PUT /api/adminPictures/:id', function() {
    var updatedAdminPicture;

    beforeEach(function(done) {
      request(app)
        .put('/api/adminPictures/' + newAdminPicture._id)
        .send({
          name: 'Updated AdminPicture',
          url: 'http://www.yahoo.com/'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAdminPicture = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAdminPicture = {};
    });

    it('should respond with the updated adminPicture', function() {
      updatedAdminPicture.name.should.equal('Updated AdminPicture');
      updatedAdminPicture.url.should.equal('http://www.yahoo.com/');
    });

  });

  describe('DELETE /api/adminPictures/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/adminPictures/' + newAdminPicture._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when adminPicture does not exist', function(done) {
      request(app)
        .delete('/api/adminPictures/' + newAdminPicture._id)
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
