/**
 * Created by Gavin on 2/4/16.
 */
'use strict';

angular.module('fmgApp').factory('SignUp', ['$http',
  function($http) {
    var methods = {
      sendConfirmationMessage: function(phoneNumber) {
        return $http.get('http://localhost:9000/api/eztextings/sendConfirmationMessage/' + phoneNumber);
      },

      createContact: function(phoneNumber) {
        return $http.get('http://localhost:9000/api/eztextings/createContact/' + phoneNumber);
      }

    };

    return methods;
  }
]);
