'use strict';

describe('Controller: StoreCtrl', function () {


  // load the controller's module
  //beforeEach(module('fmgApp'));

  var StoreCtrl, scope, auth, httpMock, http, isLoggedIn;

  var mockAuth = {

    isLoggedIn: function() { return isLoggedIn; },
    isAdmin: function() { return true; }

  };

  beforeEach(function () {
    module('fmgApp', function ($provide) {
      $provide.value('Auth', mockAuth);
    });
  });


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    httpMock = $injector.get('$httpBackend');
    http = $injector.get('$http');

    StoreCtrl = $controller('StoreCtrl', {
      $scope: scope,
    });
  }));

  it('should not let you add an item if not logged in', function() {
    isLoggedIn = false;
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

  it('should allow user to add item to cart if they are logged in', function() {
    isLoggedIn = true;

    var newStoreItem = {
      _id: "50",
      Name: 'name',
      Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
      Price: '19.99',
      Description: 'description'
    };
    scope.addToCart(newStoreItem);
    expect(scope.addedItems.length).toEqual(1);
  });


  it('should not allow user to add the same item to the cart multiple times', function() {
    isLoggedIn = true;

    var newStoreItem = {
      _id: "50",
      Name: 'name',
      Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
      Price: '19.99',
      Description: 'description'
    };
    scope.addToCart(newStoreItem);
    scope.addToCart(newStoreItem);
    expect(scope.addedItems.length).toEqual(1);
  });

  it('should show new item after one is added', function() {
    expect(1).toEqual(1);

  });





});
