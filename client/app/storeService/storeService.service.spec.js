'use strict';

describe('Service: storeService', function () {
  // Constants.
  const urlBase = '/api/storeItems';

  // load the service's module
  beforeEach(module('fmgApp'));

  // instantiate service
  var storeService, httpBackend;
  beforeEach(inject(function(_storeService_, $httpBackend) {
    storeService = _storeService_;
    httpBackend = $httpBackend;
  }));

  // make sure no expectations were missed in the tests.
  // make sure no unexpected requests were made in the tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getAllStoreItems', function () {
    it('should call GET ' + urlBase + '/', function () {
      var returnStatus = 200;

      httpBackend.expectGET(urlBase)
        .respond(returnStatus);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var succeeded;
      storeService.getAllStoreItems()
        .then(function() {
            succeeded = true;
          });

      httpBackend.flush();
      expect(succeeded).toBe(true);
    });
  });

  describe('createStoreItem', function () {
    it('should call POST ' + urlBase + '/', function () {
      var postData = {
        post: 'BOOM'
      };

      var returnStatus = 201;

      httpBackend.expectPOST(urlBase, postData)
        .respond(returnStatus, postData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      storeService.createStoreItem(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('deleteItem', function () {
    it('should call DELETE ' + urlBase + '/:id', function () {
      var postData = {
        post: 'BOOM',
        _id: 1000
      };

      var returnStatus = 204;

      httpBackend.expectDELETE(urlBase + '/' + postData._id)
        .respond(returnStatus, postData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      storeService.deleteItem(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('updateItem', function () {
    it('should call PUT ' + urlBase + '/updateStoreItem/:id', function () {
      var postData = {
        post: 'BOOM',
        _id: 1000
      };

      var returnStatus = 200;

      httpBackend.expectPUT(urlBase + '/' + 'updateStoreItem/' + postData._id)
        .respond(returnStatus, postData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      storeService.updateItem(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('createCharge', function () {
    it('should call PUT ' + urlBase + '/', function () {
      var postData = {
        post: 'BOOM',
        _id: 1000
      };

      var returnStatus = 200;

      httpBackend.expectPUT(urlBase)
        .respond(returnStatus, postData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      storeService.createCharge(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('validateAddress', function () {
    it('should call PUT ' + urlBase + '/validateAddress/', function () {
      var postData = {
        post: 'BOOM',
        _id: 1000
      };

      var returnStatus = 200;

      httpBackend.expectPUT(urlBase + '/' + 'validateAddress/')
        .respond(returnStatus, postData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      storeService.validateAddress(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

});
