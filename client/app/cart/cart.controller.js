'use strict';

angular.module('fmgApp')
  .controller('CartCtrl', function ($scope, toaster) {
    $scope.showDialog = false;
    $scope.currentItem = undefined;
    $scope.items = [
      {
        Name: "item 1",
        Description: "item 1 description",
        Price: 19.99
      },
      {
        Name: "item 2",
        Description: "item 2 description",
        Price: 9.99
      },
      {
        Name: "item 3",
        Description: "item 3 description",
        Price: 4.99
      },
      {
        Name: "item 4",
        Description: "item 4 description",
        Price: 21.99
      },
    ];

    $scope.confirmRemoveItem = function(index) {
      $scope.currentItem = index;
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.currentItem = undefined;
      $scope.showDialog = false;
    };

    $scope.removeItem = function() {
      if($scope.currentItem) {
        $scope.items.splice($scope.currentItem, 1);
        toaster.pop("success", "Item removed from cart");
        $scope.hideDialog();
      }
      else
        toaster.pop("error", "Something went wrong.");
    };

    $scope.hideDialog = function() {
      $scope.showDialog = false;
    };

    $scope.checkout = function() {
      //send email with dj's email service after he pushes.
    };

  });
