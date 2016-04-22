'use strict';

angular.module('fmgApp.admin')
  .controller('AdminController', function ($scope, toaster, signUpService, pictureService, User) {

    $scope.aboutMeUrl = "";       // string to hold the url for the about me image
    $scope.users = User.query();  // storing users in a list
    $scope.dialogVisible = false; // boolean to show/hide dialog pop-up
    // $scope.themeColors = [];
    // $scope.customColors = [];

    // Checking to make sure the text isn't empty and sending that message
    // to subscribed users, hide the dialog pop-up and show user toaster
    // verification
    $scope.sendText = function(textBody) {
      if (textBody) {
        signUpService.sendTextToGroup(textBody).success(function() {
          $scope.dialogVisible = false;
          toaster.pop('success', 'Text message sent!');
        });
      }
    };

    // Making post request to save/initially populate the url to the database
    // Only needed to be ran once
    //
    // pictureService.createPicture({url:"https://drive.google.com/open?id=0B-viYPCddrMLLTFramFTdmN5eTA", name: "aboutMe"});

    // Making get request to set the aboutMeUrl to the url of the photo saved
    // in google drive
    pictureService.getPicture("aboutMe").success(function(data) {
      $scope.aboutMeUrl = data.url;
    });

    // Making put request to update picture's url and aboutMeUrl scope variable
    //
    // Google Drive Test Images
    // jarmon_fb.jpg –– https://drive.google.com/uc?id=0B-viYPCddrMLLTFramFTdmN5eTA
    // test_1.png    –– https://drive.google.com/uc?id=0B-viYPCddrMLUmF2S3lXRlBGVTg
    //
    $scope.updatePicture = function() {
      // $scope.aboutMeUrl = $scope.aboutMeUrl.replace('open', 'uc');
      // pictureService.updatePicture({name: "aboutMe", url: $scope.aboutMeUrl}).then(function(data) {
      //   console.log(data.url);
      //   toaster.pop('success', 'Image Updated!');
      // });
      // Toaster not working because 500 error
      //
      // if ($scope.aboutMeUrl) {
      //   $scope.aboutMeUrl = $scope.aboutMeUrl.replace('open', 'uc');
      //   pictureService.updatePicture({name: "aboutMe", url: $scope.aboutMeUrl}).then(function(data) {
      //     console.log(data.url);
      //     toaster.pop('success', 'Image Updated!');
      //   });
      // }
    }

    // Removing a user from the list of users
    $scope.delete = function() {
      $scope.user.$remove();
      $scope.users.splice($scope.users.indexOf($scope.user), 1);
    };

    // Set dialog scope variable to true to show the dialog pop-up
    $scope.showDialog = function() {
      console.log('boom');
      $scope.dialogVisible = true;
    };

    // Set dialog scope variable to false to hide the dialog pop-up
    $scope.hideDialog = function() {
      $scope.dialogVisible = false;
    };

  });
