'use strict';

describe('Directive: youtube', function () {

  // load the directive's module and view
  beforeEach(module('fmgApp'));
  beforeEach(module('app/main/main.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('Should have the proper id for YouTube Player to consume', inject(function ($compile) {
    element = angular.element('<youtube></youtube>');
    element = $compile(element)(scope);
    scope.$apply();
    var iframeElement = angular.element(angular.element(element.children()[0]).children()[0]);
    expect( iframeElement.attr('id') ).toBe('youtube-player');
  }));
});
