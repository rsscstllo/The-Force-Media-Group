'use strict';

var app = require('../..');
import request from 'supertest';

var newStoreItem;

describe('StoreItem API:', function() {

  describe('GET /api/storeItems', function() {
    var storeItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/storeItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storeItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      storeItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/storeItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/storeItems')
        .send({
          name: 'New StoreItem',
          info: 'This is the brand new storeItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStoreItem = res.body;
          done();
        });
    });

    it('should respond with the newly created storeItem', function() {
      newStoreItem.name.should.equal('New StoreItem');
      newStoreItem.info.should.equal('This is the brand new storeItem!!!');
    });

  });

  describe('GET /api/storeItems/:id', function() {
    var storeItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/storeItems/' + newStoreItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storeItem = res.body;
          done();
        });
    });

    afterEach(function() {
      storeItem = {};
    });

    it('should respond with the requested storeItem', function() {
      storeItem.name.should.equal('New StoreItem');
      storeItem.info.should.equal('This is the brand new storeItem!!!');
    });

  });

  describe('PUT /api/storeItems/:id', function() {
    var updatedStoreItem;

    beforeEach(function(done) {
      request(app)
        .put('/api/storeItems/' + newStoreItem._id)
        .send({
          name: 'Updated StoreItem',
          info: 'This is the updated storeItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStoreItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStoreItem = {};
    });

    it('should respond with the updated storeItem', function() {
      updatedStoreItem.name.should.equal('Updated StoreItem');
      updatedStoreItem.info.should.equal('This is the updated storeItem!!!');
    });

  });

  describe('DELETE /api/storeItems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/storeItems/' + newStoreItem._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when storeItem does not exist', function(done) {
      request(app)
        .delete('/api/storeItems/' + newStoreItem._id)
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
