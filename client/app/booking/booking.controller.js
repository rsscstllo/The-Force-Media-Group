'use strict';

angular.module('fmgApp')
  .controller('BookingCtrl', ['$scope', '$http', 'emailService', function($scope, $http, emailService) {


    $scope.submit = function() {
      if ( $scope.propName && $scope.phoneNum && $scope.email && $scope.eventDate && $scope.eventType && $scope.descript ) {

          var bookingRequest = {
            propName: $scope.propName,
            phoneNum: $scope.phoneNum,
            email: $scope.email,
            eventDate: $scope.eventDate,
            eventType: $scope.eventType,
            descript: $scope.descript
          };
          console.log(bookingRequest);
          console.log('Calling sendBookingEmail');

          var emailObj = {
            sendTo: 'forcemediagroupdb@gmail.com',
            subject: 'New Booking Request',
            emailBody: 'Requester Name: ' + $scope.propName + '\nRequester Email: ' + $scope.email + '\nRequester Phone: ' + $scope.phoneNum + '\nEvent Type: ' + $scope.eventType + '\nEvent Description: ' + $scope.descript + '\nEvent Date/Time: ' + $scope.eventDate
          };

          emailService.sendEmail(emailObj).success(function(data) {
            console.log(data);
          });

      }
    };
  }]);
