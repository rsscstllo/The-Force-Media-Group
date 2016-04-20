'use strict';

describe('Service: signUpService', function () {
  // Constants.
  const urlBase = '/api/eztextings';

  // load the service's module
  beforeEach(module('fmgApp'));

  // instantiate service
  var signUpService, httpBackend;
  beforeEach(inject(function(_signUpService_, $httpBackend) {
    signUpService = _signUpService_;
    httpBackend = $httpBackend;
  }));

  // make sure no expectations were missed in the tests.
  // make sure no unexpected requests were made in the tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('sendConfirmationMessage', function () {
    it('should call GET ' + urlBase + '/sendConfirmationMessage/:phoneNumber', function () {
      var returnStatus = 200;

      var param = 'winning';

      httpBackend.expectGET(urlBase + '/sendConfirmationMessage/' + param)
        .respond(returnStatus);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var succeeded;
      signUpService.sendConfirmationMessage(param)
        .then(function() {
            succeeded = true;
          });

      httpBackend.flush();
      expect(succeeded).toBe(true);
    });
  });

  describe('createContact', function () {
    it('should call GET ' + urlBase + '/createContact/:phoneNumber', function () {
      var returnStatus = 200;

      var param = 'winning';

      httpBackend.expectGET(urlBase + '/createContact/' + param)
        .respond(returnStatus);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var succeeded;
      signUpService.createContact(param)
        .then(function() {
            succeeded = true;
          });

      httpBackend.flush();
      expect(succeeded).toBe(true);
    });
  });

  describe('sendTextToGroup', function () {
    it('should call GET ' + urlBase + '/sendTextToGroup/:messageText', function () {
      var returnStatus = 200;

      var param = 'winning';

      httpBackend.expectGET(urlBase + '/sendTextToGroup/' + param)
        .respond(returnStatus);

      // TODO: FIX: Weird extra GET request being sent.
      httpBackend.expectGET('app/main/main.html').respond(200);

      var succeeded;
      signUpService.sendTextToGroup(param)
        .then(function() {
            succeeded = true;
          });

      httpBackend.flush();
      expect(succeeded).toBe(true);
    });
  });


});
