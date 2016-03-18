'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope, StoreService) {
    $scope.message = 'Hello';
    $scope.storeItems = undefined;

    StoreService.getAllStoreItems().success(function(data) {
      $scope.storeItems = data;
    });

    $scope.createItem = function() {
      console.log('create item');
      $scope.storeItem = {
        Name: 'Name3',
        Picture: 'picture3',
        Price: 4.99,
        Description: 'description3'
      };

        StoreService.createStoreItem($scope.storeItem).success(function(data) {
          console.log(data);
        });
    }
  });
