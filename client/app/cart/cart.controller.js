'use strict';

angular.module('fmgApp')
  .controller('CartCtrl', function ($scope, toaster, $stateParams, Auth, $state, storeService) {
    $scope.showDialog = false;
    $scope.currentItem = undefined;
    $scope.items = $stateParams.items;
    $scope.orderTotal = 0;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.checkingOut = false;
    $scope.shippingInfo = {
      fullName: undefined,
      address1: undefined,
      address2: undefined,
      city: undefined,
      state: undefined,
      zip: undefined
    };

    if($scope.items.length === 0)
      $state.go('store');

    $scope.card = {
      number: undefined,
      exp_month: undefined,
      exp_year: undefined,
      cvc: undefined
    };

    $scope.items.forEach(function(item) {
      $scope.orderTotal += item.Price;
    });

    $scope.confirmRemoveItem = function(index) {
      $scope.currentItem = index;
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.currentItem = undefined;
      $scope.showDialog = false;
    };

    $scope.removeItem = function() {
      console.log("current user");
      console.log($scope.currentUser);
      $scope.items.splice($scope.currentItem, 1);
      toaster.pop('success', 'Item removed from cart');

      $scope.orderTotal = 0;
      $scope.items.forEach(function(item) {
        $scope.orderTotal += item.Price;
      });

      $scope.hideDialog();
    };

    $scope.hideDialog = function() {
      $scope.showDialog = false;
    };

    $scope.checkout = function() {
      $scope.checkingOut = true;
      console.log($scope.shippingInfo);
    };

    $scope.submitPayment = function() {
      var priceInCents = Math.floor($scope.orderTotal * Math.pow(10,2));
      var stripeObj = {
        amount: priceInCents,
        card: $scope.card,
        description: "Charge for " + $scope.currentUser.email
      };

      storeService.createCharge(stripeObj).success(function(data) {
        console.log(data);
      });
      //send email with dj's email service after he pushes.
    }


  });
