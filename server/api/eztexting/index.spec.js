'use strict';

/*
var proxyquire = require('proxyquire').noPreserveCache();

var eztextingCtrlStub = {
  index: 'eztextingCtrl.index',
  show: 'eztextingCtrl.show',
  create: 'eztextingCtrl.create',
  update: 'eztextingCtrl.update',
  destroy: 'eztextingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eztextingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './eztexting.controller': eztextingCtrlStub
});

describe('Eztexting API Router:', function() {

  it('should return an express router instance', function() {
    eztextingIndex.should.equal(routerStub);
  });

  describe('GET /api/eztextings', function() {

    it('should route to eztexting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'eztextingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/eztextings/:id', function() {

    it('should route to eztexting.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'eztextingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/eztextings', function() {

    it('should route to eztexting.controller.create', function() {
      routerStub.post
        .withArgs('/', 'eztextingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/eztextings/:id', function() {

    it('should route to eztexting.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'eztextingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/eztextings/:id', function() {

    it('should route to eztexting.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'eztextingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/eztextings/:id', function() {

    it('should route to eztexting.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'eztextingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
*/
