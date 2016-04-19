'use strict';

describe('Service: blogService', function () {
  // Constants.
  const urlBase = '/api/blogs';

  // load the service's module
  beforeEach(module('fmgApp'));

  // instantiate service
  var blogService, httpBackend;
  beforeEach(inject(function(_blogService_, $httpBackend) {
    blogService = _blogService_;
    httpBackend = $httpBackend;
  }));

  // make sure no expectations were missed in the tests.
  // make sure no unexpected requests were made in the tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getAllPosts', function () {
    it('should call GET ' + urlBase + '/', function () {
      var returnStatus = 200;

      httpBackend.expectGET(urlBase)
        .respond(returnStatus);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var succeeded;
      blogService.getAllPosts()
        .then(function() {
            succeeded = true;
          });

      httpBackend.flush();
      expect(succeeded).toBe(true);
    });
  });

  describe('createPost', function () {
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
      blogService.createPost(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('deletePost', function () {
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
      blogService.deletePost(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

  describe('editPost', function () {
    it('should call PUT ' + urlBase + '/:id', function () {
      var postData = {
        post: 'BOOM',
        _id: 1000
      };

      var returnStatus = 200;

      httpBackend.expectPUT(urlBase + '/' + postData._id)
        .respond(returnStatus, postData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      blogService.editPost(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(postData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });


  describe('togglePublished', function () {
    it('should call PUT ' + urlBase + '/:id with published flipped from true to false', function () {
      var postData = {
        post: 'BOOM',
        published: true,
        _id: 1000
      };

      var expectedPostData = {
        post: 'BOOM',
        published: false,
        _id: 1000
      }

      var returnStatus = 200;

      httpBackend.expectPUT(urlBase + '/' + postData._id)
        .respond(returnStatus, expectedPostData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      blogService.togglePublished(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(expectedPostData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });

    it('should call PUT ' + urlBase + '/:id with published flipped from true to false', function () {
      var postData = {
        post: 'BOOM',
        published: false,
        _id: 1000
      };

      var expectedPostData = {
        post: 'BOOM',
        published: true,
        _id: 1000
      }

      var returnStatus = 200;

      httpBackend.expectPUT(urlBase + '/' + postData._id)
        .respond(returnStatus, expectedPostData);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var result = {};
      blogService.togglePublished(postData)
        .then(function(response) {
            result.data = response.data;
            result.status = response.status;
          });

      httpBackend.flush();
      expect(expectedPostData).toEqual(result.data);
      expect(returnStatus).toEqual(result.status);
    });
  });

});
