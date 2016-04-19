'use strict';

describe('Service: emailService', function () {
  // Constants.
  const urlBase = '/api/emails';

  // load the service's module
  beforeEach(module('fmgApp'));

  // instantiate service
  var emailService, httpBackend;
  beforeEach(inject(function(_emailService_, $httpBackend) {
    emailService = _emailService_;
    httpBackend = $httpBackend;
  }));

  // make sure no expectations were missed in the tests.
  // make sure no unexpected requests were made in the tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('sendEmail', function () {
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
      emailService.sendEmail(postData)
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
