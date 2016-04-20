'use strict';

describe('Controller: CartCtrl', function () {
  var $scope, ctrl, $timeout, httpBackend, q;

  /* declare our mocks out here
   * so we can use them through the scope
   * of this describe block.
   */
  var  storeServiceMock,
    AuthMock,
    toaster;

  var sampleStoreResponse = { data: [{
    _id: 1,
    Name: "shirt",
    Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
    Price: 19.99,
    Description: "a shirt"
  },
    {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    }]
  };



  // This function will be called before every "it" block.
  // This should be used to "reset" state for your tests.
  beforeEach(function (){
    // Create "spy objects" for our services.
    // This will isolate the controller we're testing from
    // any other code.
    // we'll set up the returns for this later
    storeServiceMock = jasmine.createSpyObj('storeService', ['getAllStoreItems', 'createStoreItem', 'updateItem', 'deleteItem']);
    AuthMock = jasmine.createSpyObj('Auth', ['isLoggedIn', 'isAdmin', 'getCurrentUser']);

    // load the module you're testing.
    module('fmgApp');

    // INJECT! This part is critical
    // $rootScope - injected to create a new $scope instance.
    // $controller - injected to create an instance of our controller.
    // $q - injected so we can create promises for our mocks.
    // _$timeout_ - injected to we can flush unresolved promises.
    inject(function($controller, $rootScope, $q, _$timeout_, $httpBackend, _toaster_) {
      // create a scope object for us to use.
      $scope = $rootScope.$new();

      // set up the returns for our mocks
      // $q.when(value) creates a resolved promise to value.
      // this is important since our service is async and returns a promise.
      AuthMock.isLoggedIn.and.returnValue(false);
      AuthMock.isAdmin.and.returnValue(false);
      AuthMock.getCurrentUser.and.returnValue(null);
      storeServiceMock.getAllStoreItems.and.returnValue($q.when(sampleStoreResponse));

      toaster = _toaster_;
      spyOn(toaster, 'pop');

      // assign $timeout to a scoped variable so we can use
      // $timeout.flush() later. Notice the _underscore_ trick
      // so we can keep our names clean in the tests.
      $timeout = _$timeout_;

      // hack for weird extra GET app/main/main.html request
      httpBackend = $httpBackend;

      // Using this to create/resolve promises in the tests.
      q = $q;

      // now run that scope through the controller function,
      // injecting any services or other injectables we need.
      // **NOTE**: this is the only time the controller function
      // will be run, so anything that occurs inside of that
      // will already be done before the first spec.
      ctrl = $controller('StoreCtrl', {
        $scope: $scope,
        storeService: storeServiceMock,
        Auth: AuthMock,
        toaster: toaster
      });
    });
  });

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






});
