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
    // Only needed to be run once
    // pictureService.createPicture({url:"https://drive.google.com/open?id=0B-viYPCddrMLLTFramFTdmN5eTA", name: "aboutMe"});

    // Making get request to set the aboutMeUrl to the url of the photo saved
    // in google drive
    pictureService.getPicture("aboutMe").success(function(data) {
      $scope.aboutMeUrl = data.url;
    });

    // Making put request to update the picture's url and aboutMeUrl scope
    // variable
    $scope.updatePicture = function() {
      if ($scope.aboutMeUrl) {
        pictureService.updatePicture({name: "aboutMe", url: $scope.aboutMeUrl}).success(function(data) {
          $scope.aboutMeUrl = data.url;
          toaster.pop('success', 'Image Updated!');
        });
      }
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

    // colorService.getAllColors()
    //   .then(function(response) {
    //     $scope.themeColors = response.data;
    //     $scope.customColors = response.data;
    //     console.log(response.data);
    //   }).catch(function(err) {
    //       console.log(err);
    //   });
    //
    // $scope.saveCustomColorTheme = function() {
    //   console.log('save button clicked');
    //   console.log($scope.customColors);
    //
    //   $scope.customColors.forEach(function(item) {
    //     colorService.updateColor(item)
    //       .then(function(response) {
    //         console.log(response.data);
    //         colorService.getAllColors()
    //           .then(function(response) {
    //             $scope.themeColors = response.data;
    //             $scope.customColors = response.data;
    //             var colors = response.data;
    //
    //             $('.deepSeaBackground').css({'background-color': colors[0].colorCode});
    //             $('.deepSeaColor').css({'color': colors[0].colorCode});
    //
    //             $('.skyBlueBackground').css({'background-color': colors[1].colorCode});
    //             $('.skyBlueColor').css({'color': colors[1].colorCode});
    //
    //             $('.crestBackground').css({'background-color': colors[2].colorCode});
    //             $('.crestColor').css({'color': colors[2].colorCode});
    //
    //             $('.sadDayBackground').css({'background-color': colors[3].colorCode});
    //             $('.sadDayColor').css({'color': colors[3].colorCode});
    //
    //             $('.cloudyBackground').css({'background-color': colors[4].colorCode});
    //             $('.cloudyColor').css({'color': colors[4].colorCode});
    //
    //             console.log(response.data);
    //           }).catch(function(err) {
    //               console.log(err);
    //           });
    //
    //       }).catch(function(err) {
    //         console.log(err);
    //       });
    //   });
    //
    // };
    //
    // $scope.createColor = function() {
    //
    //   var hexCode = $scope.color.text;
    //
    //   if (hexCode === '') {
    //     toaster.pop('error','Please enter text.');
    //     return;
    //   }
    //
    //   var colorToCreate = {
    //     hexCode: hexCode
    //   };
    //
    //   colorService.createColor(colorToCreate)
    //     .then(function (response) {
    //       var color = response.data;
    //       toaster.pop('success','Color submitted');
    //       $scope.color.text = '';
    //       console.log(color);
    //       $scope.themeColors.push(color);
    //     }).catch(function(err){
    //       console.log(err);
    //     });
    // };

  });
