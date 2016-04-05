'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope, $state, toaster, Auth, storeService) {
    $scope.addedItems = [];
    $scope.isAdmin = Auth.isAdmin();
    $scope.showAddItemDialog = false;
    $scope.editingItem = false;
    $scope.tmpItem = undefined;

    $scope.newStoreItem = {
      Name: undefined,
      Picture: undefined,
      Price: undefined,
      Description: undefined
    };

    storeService.getAllStoreItems().success(function(data) {
      $scope.items = data;
    });

    $scope.seeItem = function(index) {
      //shallow copy selected item
      $scope.selectedItem = $.extend( {}, $scope.items[index]);
      console.log($scope.selectedItem);
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.selectedItem = undefined;
      $scope.showDialog = false;
    };

    $scope.addToCart= function(item){
      toaster.pop('success', 'Added ' + item.Name);
      $scope.addedItems.push(item);
      console.log($scope.addedItems);
    };

    $scope.addStoreItem = function() {
      $scope.showAddItemDialog = true;
    };

    $scope.closeAddStoreItem = function() {
      $scope.showAddItemDialog = false;
    };

    $scope.saveStoreItem = function() {
      console.log($scope.newStoreItem);
      storeService.createStoreItem($scope.newStoreItem).success(function(data) {
        $scope.closeAddStoreItem();
      });
    };

    $scope.editItem = function() {
      $scope.tmpItem = $.extend( {}, $scope.selectedItem );
      $scope.editingItem = true;
    };

    $scope.saveEdit = function() {
      $scope.selectedItem = $scope.tmpItem;
      storeService.updateItem($scope.tmpItem).success(function(data) {
        storeService.getAllStoreItems().success(function(data) {
          $scope.items = data;
          $scope.editingItem = false;
        });

      });
    };

    $scope.undoEdit = function() {
      $scope.editingItem = false;
      $scope.tmpItem = undefined;
    };

    $scope.deleteStoreItem = function() {
      storeService.deleteItem($scope.selectedItem).success(function() {
        storeService.getAllStoreItems().success(function(data) {
          $scope.items = data;
          $scope.closeDialog();
        });
      });
    };


  });
