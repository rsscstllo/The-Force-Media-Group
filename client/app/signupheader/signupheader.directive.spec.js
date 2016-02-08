'use strict';

describe('Directive: signupheader', function () {

  // load the directive's module and view
  beforeEach(module('fmgApp'));
  beforeEach(module('app/signupheader/signupheader.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<signupheader></signupheader>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signupheader directive');
  }));
});
