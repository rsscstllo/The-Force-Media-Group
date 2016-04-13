'use strict';

describe('Service: colorService', function () {

  // Load the service's module
  beforeEach(module('fmgApp'));

  // Instantiate service
  var colorService;
  beforeEach(inject(function (_colorService_) {
    colorService = _colorService_;
  }));

  it('should do something', function () {
    expect(!!colorService).toBe(true);
  });

});
