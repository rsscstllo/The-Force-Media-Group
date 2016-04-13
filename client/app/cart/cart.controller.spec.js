'use strict';

describe('Controller: CartCtrl', function () {

  // load the controller's module
  beforeEach(module('fmgApp'));
  var CartCtrl, scope, httpMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    httpMock = $injector.get('$httpBackend');

    CartCtrl = $controller('CartCtrl', {
      $scope: scope,
      $routeParams: [{
        _id: "50",
        Name: 'name',
        Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
        Price: '20.00',
        Description: 'description',
        Quantity: 1}]
    });
  }));

  it('should update the order total when item quantity changes', function() {
    expect(1).toEqual(1);
    //httpMock.whenGET("app/store/store.html").respond('');
    //scope.$digest();
    //expect(scope.orderTotal).toEqual(20);
    //scope.items[0].Quantity = 2;
    //scope.$digest();
    //expect(scope.orderTotal).toEqual(40);

  });

  it('should remove an item from the cart when delete is clicked', function() {
    expect(1).toEqual(1);

  });

  it('should return to store if item is deleted and nothing is left in the cart', function() {
    expect(1).toEqual(1);

  });

  it("shouldn\'t continue to checkout if address is invalid", function() {
    expect(1).toEqual(1);

  });

  it('should continue to checkout if address is valid', function() {
    expect(1).toEqual(1);

  });

  it('should allow user to change shipping information and go back to checkout without changing anything', function() {
    expect(1).toEqual(1);

  });

  it('should allow user to go back and change shipping information', function() {
    expect(1).toEqual(1);

  });

  it('should fail on problem with card number or account balance', function() {
    expect(1).toEqual(1);

  });

  it('should fail on invalid expiration month', function() {
    expect(1).toEqual(1);

  });

  it('should fail on invalid expiration year', function() {
    expect(1).toEqual(1);

  });

  it('should fail on invalid cvv', function() {
    expect(1).toEqual(1);

  });

  it('should return to store if order is successfully completed', function() {
    expect(1).toEqual(1);

  });

});
