'use strict';

angular.module('fmgApp')
  .service('commentService', function ($http) {
    var baseUrl = "/api/comments/";

    var methods = {
      getAllComments: function(){
        return $http.get(baseUrl);
      },
      createComment: function(comment){
        return $http.post(baseUrl, comment);
      }
    };

    return methods;
  });
