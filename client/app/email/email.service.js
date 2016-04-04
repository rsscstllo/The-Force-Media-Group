'use strict';

angular.module('fmgApp')
  .service('emailService', function ($http) {

    var baseUrl = "api/bookingFormNews";
    var methods = {
      sendBookingEmail: function(bookingStuff){
        return $http.post(baseUrl, bookingStuff);
      }
    }
    return methods;
   });
