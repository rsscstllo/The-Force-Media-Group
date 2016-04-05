'use strict';

angular.module('fmgApp')
  .service('emailService', function ($http) {

    var baseUrl = "api/emails";
    var methods = {
      sendBookingEmail: function(bookingStuff){
        return $http.post(baseUrl, bookingStuff);
      },
      sendOrderEmail: function(orderInfo) {
        return $http.post(baseUrl, orderInfo);
      }
    };

    return methods;
   });
