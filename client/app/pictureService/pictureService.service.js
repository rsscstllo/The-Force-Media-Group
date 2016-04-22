'use strict';

angular.module('fmgApp')
  .service('pictureService', function ($http) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = "api/adminPictures/";

    // Methods to be used throughout the application for setting, updating, and
    // retrieving images on the site.
    var methods = {
      getPicture: function(name){
        return $http.get(baseUrl + name);
      },
      updatePicture: function(picture) {
        return $http.put(baseUrl + picture.name, picture);
      },
      createPicture: function(picture) {
        return $http.post(baseUrl, picture);
      }
    };

    return methods;

  });
