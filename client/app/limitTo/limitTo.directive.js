'use strict';


//directive to limit number of characters in an input to two.
angular.module('fmgApp')
  .directive("limitTo", function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var limit = parseInt(attrs.limitTo);
        angular.element(elem).on("keypress", function(e) {
          if (this.value.length == limit) e.preventDefault();
        });
      }
    }
  });
