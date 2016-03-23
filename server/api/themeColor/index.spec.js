'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var themeColorCtrlStub = {
  index: 'themeColorCtrl.index',
  show: 'themeColorCtrl.show',
  create: 'themeColorCtrl.create',
  update: 'themeColorCtrl.update',
  destroy: 'themeColorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var themeColorIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './themeColor.controller': themeColorCtrlStub
});

describe('ThemeColor API Router:', function() {

  it('should return an express router instance', function() {
    themeColorIndex.should.equal(routerStub);
  });

  describe('GET /api/themeColors', function() {

    it('should route to themeColor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'themeColorCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/themeColors/:id', function() {

    it('should route to themeColor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'themeColorCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/themeColors', function() {

    it('should route to themeColor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'themeColorCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/themeColors/:id', function() {

    it('should route to themeColor.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'themeColorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/themeColors/:id', function() {

    it('should route to themeColor.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'themeColorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/themeColors/:id', function() {

    it('should route to themeColor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'themeColorCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
