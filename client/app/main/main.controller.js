'use strict';

angular.module('fmgApp')
  .controller('MainController', function ($scope, toaster, pictureService) {
    $scope.aboutMeUrl = "";

    pictureService.getPicture("aboutMe").success(function(data) {
      $scope.aboutMeUrl = data.url;
    });

  });
