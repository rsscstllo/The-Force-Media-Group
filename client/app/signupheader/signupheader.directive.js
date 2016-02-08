'use strict';

angular.module('fmgApp')
  .directive('signupheader', function () {
    return {
      templateUrl: 'app/signupheader/signupheader.html',
      restrict: 'EA',
      controller: 'SignUpHeaderController',
      controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
      }
    };
  });
