'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope) {
    $scope.addedItems = [];
    $scope.items=[
      {
        Name: 'Item 1',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 2',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 3',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 4',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 5',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 6',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      }
    ];
    $scope.addToCart= function(index){

    }
    $scope.seeItem = function(index) {
      $scope.selectedItem = $scope.items[index];
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.selectedItem = undefined;
      $scope.showDialog = false;
    };

  });
