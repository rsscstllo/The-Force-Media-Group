'use strict';

describe('Controller: StoreCtrl', function () {

  // load the controller's module
  beforeEach(module('fmgApp'));

  var StoreCtrl, scope, auth;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Auth) {
    scope = $rootScope.$new();
    auth = Auth;
    StoreCtrl = $controller('StoreCtrl', {
      $scope: scope,
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('should not let you add an item if not logged in', function() {
    var newStoreItem = {
      _id: "-50",
      Name: 'name',
      Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
      Price: '19.99',
      Description: 'description'
    };

    var startingLength = scope.addedItems.length;
    scope.addToCart(newStoreItem);

    expect(scope.addedItems.length).toEqual(0);
  });

  //write test for should not be able to add duplicate items to cart once we figure out how to login from jasmine.

  it('should show modal dialog when item is clicked', function() {
    scope.seeItem(0);

  });

  it('should not show admin buttons when user is not admin', function() {

  });
});
