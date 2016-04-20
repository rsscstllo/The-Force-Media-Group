'use strict';

describe('Service: commentService', function () {
  // Constants.
  const urlBase = '/api/comments';

  // load the service's module
  beforeEach(module('fmgApp'));

  // instantiate service
  var commentService, httpBackend;
  beforeEach(inject(function(_commentService_, $httpBackend) {
    commentService = _commentService_;
    httpBackend = $httpBackend;
  }));

  // make sure no expectations were missed in the tests.
  // make sure no unexpected requests were made in the tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getAllComments', function () {
    it('should call GET ' + urlBase + '/', function () {
      var returnStatus = 200;

      httpBackend.expectGET(urlBase)
        .respond(returnStatus);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var succeeded;
      commentService.getAllComments()
        .then(function() {
            succeeded = true;
          });

      httpBackend.flush();
      expect(succeeded).toBe(true);
    });
  });

  describe('createComment', function () {
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
      commentService.createComment(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('deleteComment', function () {
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
      commentService.deleteComment(postData)
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
