'use strict';

angular.module('fmgApp')
  .controller('BookingCtrl', ['$scope', '$http', 'emailService', function($scope, $http, emailService) {
     function resetForm() {
        $scope.propName = 'DJ Meyers';
        $scope.phoneNum = '5619510869';
        $scope.email = 'djmeyers@outlook.com';
        $scope.eventDate = '04/15/2016 05:30 PM';
        $scope.eventType = 'Speaking';
        $scope.descript = 'asdfasdf';
     }


    $scope.submit = function() {
      if ( $scope.propName && $scope.phoneNum && $scope.email && $scope.eventDate && $scope.eventType && $scope.descript ) {
          // $http.post('/someUrl', data, config).then(successCallback, errorCallback);
          // $http.post('/api/BookingCtrl', $scope.BookingCtrl).then( function(data) {
          //     console.log('SUCCESS');
          //     resetForm();
          //     // May want to redirect somewhere after success, or take the received data back, and display it somehow?
          //   }, function(err) { console.log(err); }
          // );
          var bookingRequest = {
            propName: $scope.propName,
            phoneNum: $scope.phoneNum,
            email: $scope.email,
            eventDate: $scope.eventDate,
            eventType: $scope.eventType,
            descript: $scope.descript
          }
          console.log(bookingRequest);
          console.log('Calling sendBookingEmail');
          emailService.sendBookingEmail(bookingRequest).success(function(data) {
            console.log(data);
          })

      }
    };
  }]);
