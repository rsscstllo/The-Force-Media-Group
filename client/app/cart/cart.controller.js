'use strict';

angular.module('fmgApp')
  .controller('CartCtrl', function ($scope, toaster, $stateParams, Auth, $state, storeService, emailService) {
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
      cvv: undefined
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

      storeService.createCharge(stripeObj).then(function(data) {

        var emailString = "<table>" +
          "<thead>" +
          "<tr><td>Shipping Information</td></tr>" +
          "</thead>" +
          "<tr>" +
          "<td>Full Name</td>" +
          "<td>" + $scope.shippingInfo.fullName +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Address 1</td>" +
          "<td>" + $scope.shippingInfo.address1 +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Address 2</td>" +
          "<td>" + $scope.shippingInfo.address2 +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>City</td>" +
          "<td>" + $scope.shippingInfo.city +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>State</td>" +
          "<td>" + $scope.shippingInfo.state +
          "</td></tr>" +
          "<tr>" +
          "<td>Zip Code</td>" +
          "<td>" + $scope.shippingInfo.zip +
          "</td></tr>" +
          "</table><br />" +
          "<h3>Products Ordered</h3>" +
          "<table>" +
          "<thead>" +
          "<tr>" +
          "<td>Name</td>" +
          "<td>Price</td>" +
          "<td>Quantity Ordered</td>" +
          "</tr></thead>";


        $scope.items.forEach(function(item) {
          emailString += "<tr>" +
            "<td>" + item.Name +
            "</td>" +
            "<td>" + item.Price +
            "</td>" +
            "</tr>"
        });

        emailString += "</table>";

        //FIX ME
        //send a copy of email to jarmone and to the logged in user
        console.log(data);
        if(data.data.status === "succeeded") {
          var emailObj = {
            sendTo: "fmgMerchandise@gmail.com",
            subject: 'New Merchandise Order',
            emailBody: emailString
          };
          console.log(emailObj);

          emailService.sendOrderEmail(emailObj).then(function (email) {
            console.log(email);
            toaster.pop("success", "Order Placed.", "An email has been sent to confirm your order details.");
            $state.go('store');
          });
        } else {
          console.log("payment error");
          toaster.pop("error", "Payment Error!", data.data.message);
        }
      });
    }


  });
