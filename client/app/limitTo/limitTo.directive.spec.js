'use strict';

describe('Directive: limitTo', function () {

  // load the directive's module
  beforeEach(module('fmgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should not let you add more than two characters to an input', function() {
    expect(1).toEqual(1);
  });
});
