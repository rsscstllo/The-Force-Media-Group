'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope, $state, toaster, Auth, storeService) {
    $scope.addedItems = [];
    $scope.isAdmin = Auth.isAdmin();
    $scope.showAddItemDialog = false;
    $scope.editingItem = false;
    $scope.tmpItem = undefined;
    $scope.items = [];

    //default new store item with a default picture.
    $scope.newStoreItem = {
      Name: undefined,
      Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
      Price: undefined,
      Description: undefined
    };

    //watch picture url to replace param in url to allow image to show up from google drive.
    $scope.$watch('newStoreItem.Picture', function(value) {
      if(value) {
        $scope.newStoreItem.Picture = $scope.newStoreItem.Picture.replace('open', 'uc');
      }
    });

    if($scope.isAdmin) {
      $('.ng-modal-dialog').css({'height': '85%'});
    }

    //get all items when controller loads
    storeService.getAllStoreItems().then(function(response) {
      $scope.items = response.data;
    });
    //to see a more detailed description of selected item

    $scope.updateItems = function() {
      storeService.getAllStoreItems().then(function(response) {
        $scope.items = response.data;
      });
    };



    //copy item to selected item, show modal view
    $scope.seeItem = function(index) {
      //shallow copy selected item
      $scope.selectedItem = $.extend( {}, $scope.items[index]);
      console.info($scope.selectedItem);
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.selectedItem = undefined;
      $scope.showDialog = false;
    };

    //add an item to the cart. User must be logged in to do so.
    $scope.addToCart= function(newItem){
      console.info('is logged in');
      console.info(Auth.isLoggedIn());
      if(Auth.isLoggedIn()) {
        var found = false;

        $scope.addedItems.forEach(function (oldItem) {
          if (oldItem._id === newItem._id) {
            found = true;
          }
        });
        if (found) {
          toaster.pop('error', 'This item is already in your cart.', 'Go to your cart to remove the item or to change the quantity desired.');
        } else {
          toaster.pop('success', 'Added ' + newItem.Name + ' to the cart!');
          newItem.Quantity = 1;
          $scope.addedItems.push(newItem);
        }
      } else {
        toaster.pop('error', 'You must log in to add items to your cart.');
      }
    };

    $scope.addStoreItem = function() {
      $scope.showAddItemDialog = true;
    };

    $scope.closeAddStoreItem = function() {
      $scope.showAddItemDialog = false;
    };

    $scope.closeEditItem = function() {
      $scope.editingItem = false;
      $scope.tmpItem = undefined;
    };

    //save new store item to database, then get all store items.
    $scope.saveStoreItem = function() {
      if(Auth.isAdmin()) {
        console.log($scope.newStoreItem);
        storeService.createStoreItem($scope.newStoreItem).then(function () {
          $scope.newStoreItem = {
            Name: undefined,
            Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
            Price: undefined,
            Description: undefined
          };

          toaster.pop('success', 'New Item Added!');

          $scope.closeAddStoreItem();
          storeService.getAllStoreItems().then(function (response) {
            $scope.items = response.data;
          });
        });
      } else {
        toaster.pop('error', 'You must be logged in as admin to do this.');
      }
    };

    $scope.editItem = function() {
      $scope.tmpItem = $.extend( {}, $scope.selectedItem );
      $scope.editingItem = true;
    };

    $scope.saveEdit = function() {
      if(Auth.isAdmin()) {
        $scope.selectedItem = $scope.tmpItem;
        storeService.updateItem($scope.tmpItem).then(function () {
          storeService.getAllStoreItems().then(function (response) {
            $scope.items = response.data;
            $scope.editingItem = false;
          });

        });
      } else {
        toaster.pop('error', 'You must be logged in as admin to do this.');
      }
    };

    $scope.undoEdit = function() {
      $scope.editingItem = false;
      $scope.tmpItem = undefined;
    };

    $scope.deleteStoreItem = function() {
      if(Auth.isAdmin()) {
        storeService.deleteItem($scope.selectedItem).then(function () {
          storeService.getAllStoreItems().then(function (response) {
            $scope.items = response.data;
            $scope.closeDialog();
          });
        });
      } else {
        toaster.pop('error', 'You must be logged in as admin to do this.');
      }
    };


  });
