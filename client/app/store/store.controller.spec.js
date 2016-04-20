'use strict';

describe('Controller: StoreCtrl', function () {
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
      storeServiceMock.getAllStoreItems.and.returnValue($q.when(sampleStoreResponse.data));

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

  it('should start with populated', function() {
    // Just assert. $scope was set up in beforeEach() (above)
    expect($scope.addedItems).toEqual([]);
    expect($scope.showAddItemDialog).toEqual(false);
    expect($scope.editingItem).toEqual(false);
    expect($scope.tmpItem).toEqual(undefined);
    expect($scope.items).toEqual([]);
    expect($scope.isAdmin).toEqual(false);

  });

  it('should get all store items', function() {
    // Arrange.
    $scope.items = [];

    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.updateItems();

    // Assert.
    expect(storeServiceMock.getAllStoreItems).toHaveBeenCalled();

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.items).toEqual(sampleStoreResponse.data);
  });

  it('should show add store item dialog on add store item', function() {
    $scope.addStoreItem();
    expect($scope.showAddItemDialog).toBe(true);
  });

  it('should close add store item dialog on close', function() {
    $scope.closeAddStoreItem();
    expect($scope.showAddItemDialog).toBe(false);
  });

  it('should close editing item on close', function() {
    $scope.closeEditItem();
    expect($scope.editingItem).toBe(false);
    expect($scope.tmpItem).toBeUndefined();
  });

  it('should select an item and show dialog on item clicked', function() {
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    $scope.items = [{
      _id: 1,
      Name: "shirt",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 19.99,
      Description: "a shirt"
    }];

    $scope.seeItem(0);
    expect($scope.selectedItem).toEqual($scope.items[0]);
    expect($scope.showDialog).toBe(true);
  });

  it('should close dialog for viewing an item on close', function() {
    $scope.closeDialog();
    expect($scope.selectedItem).toBeUndefined();
    expect($scope.showDialog).toBe(false);
  });

  it('should replace the google url pasted from the drive to the proper url for getting an image', function() {
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    $scope.newStoreItem.Picture = "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc";
    $scope.$apply();
    expect($scope.newStoreItem.Picture).toEqual("https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc");
  });


  it('should allow user to add item to cart if they are logged in', function() {

    //fake login
    AuthMock.isLoggedIn.and.returnValue(true);
    expect(AuthMock.isLoggedIn()).toBe(true);

    var newItem = {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    };

    $scope.addToCart(newItem);
    expect(toaster.pop).toHaveBeenCalledWith('success', 'Added ' + newItem.Name + ' to the cart!');

    //reset logged in for other tests
    AuthMock.isLoggedIn.and.returnValue(false);
    expect(AuthMock.isLoggedIn()).toBe(false);

  });

  it('should not allow user to add item to cart if they are not logged in', function() {
    expect(AuthMock.isLoggedIn()).toBe(false);
    var newItem = {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    };

    $scope.addToCart(newItem);
    expect(toaster.pop).toHaveBeenCalledWith('error', 'You must log in to add items to your cart.');
  });


  it('should not allow user to add the same item to the cart multiple times', function() {
    AuthMock.isLoggedIn.and.returnValue(true);
    expect(AuthMock.isLoggedIn()).toBe(true);
    var newItem = {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    };

    $scope.addToCart(newItem);
    $scope.addToCart(newItem);
    expect(toaster.pop).toHaveBeenCalledWith('error', 'This item is already in your cart.', 'Go to your cart to remove the item or to change the quantity desired.');

    //reset logged in for other tests
    AuthMock.isLoggedIn.and.returnValue(false);
    expect(AuthMock.isLoggedIn()).toBe(false);
  });


  it('should create a a new store item and refresh items when done', function() {
    AuthMock.isAdmin.and.returnValue(true);
    expect(AuthMock.isAdmin()).toBe(true);

    // Arrange.
    storeServiceMock.createStoreItem.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    $scope.newStoreItem = {
      _id: 3,
      Name: "new pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 18.99,
      Description: "new pants"
    };

    // Act.
    $scope.saveStoreItem();

    // Assert.
    expect(storeServiceMock.createStoreItem).toHaveBeenCalled();
    $timeout.flush();

    expect(toaster.pop).toHaveBeenCalledWith('success', 'New Item Added!');

    expect(storeServiceMock.getAllStoreItems).toHaveBeenCalled();

    expect($scope.items).toEqual(sampleStoreResponse.data);
    expect($scope.showAddItemDialog).toBe(false);

    //reset logged in for other tests
    AuthMock.isAdmin.and.returnValue(false);
    expect(AuthMock.isAdmin()).toBe(false);

  });

  it('should not allow you to create a store item if not logged in as admin', function() {
    expect(AuthMock.isLoggedIn()).toBe(false);
    $scope.saveStoreItem();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'You must be logged in as admin to do this.');
  });


  it('should show editing item dialogs', function() {
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening


    $scope.selectedItem = {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    };

    $scope.editItem();
    $scope.$apply();
    expect($scope.tmpItem).toEqual($scope.selectedItem);
    expect($scope.editingItem).toBe(true);
  });


  it('should update an item and refresh items on page', function() {
    AuthMock.isAdmin.and.returnValue(true);
    expect(AuthMock.isAdmin()).toBe(true);
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    storeServiceMock.updateItem.and.returnValue(q.when(true));


    $scope.tmpItem = {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    };

    // Act.
    $scope.saveEdit();

    // Assert.
    expect(storeServiceMock.updateItem).toHaveBeenCalled();
    $timeout.flush();
    expect(storeServiceMock.getAllStoreItems).toHaveBeenCalled();

    expect($scope.items).toEqual(sampleStoreResponse.data);
    expect($scope.editingItem).toBe(false);

    //reset logged in for other tests
    AuthMock.isAdmin.and.returnValue(false);
    expect(AuthMock.isAdmin()).toBe(false);

  });

  it('should not allow item to be updated if not logged in as admin', function() {
    $scope.saveEdit();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'You must be logged in as admin to do this.');

  });

  it('should restore view to the way it was before the edit without saving item', function() {
    expect($scope.editingItem).toBe(false);
    expect($scope.tmpItem).toBeUndefined();
  });


  it('should delete an item, refresh the items on the page, and close the dialog' , function() {
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    AuthMock.isAdmin.and.returnValue(true);
    expect(AuthMock.isAdmin()).toBe(true);
    storeServiceMock.deleteItem.and.returnValue(q.when(true));


    $scope.selectedItem = {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 14.99,
      Description: "pants"
    };

    // Act.
    $scope.deleteStoreItem();

    // Assert.
    expect(storeServiceMock.deleteItem).toHaveBeenCalled();
    $timeout.flush();
    expect(storeServiceMock.getAllStoreItems).toHaveBeenCalled();

    expect($scope.items).toEqual(sampleStoreResponse.data);
    expect($scope.editingItem).toBe(false);

    //reset logged in for other tests
    AuthMock.isAdmin.and.returnValue(false);
    expect(AuthMock.isAdmin()).toBe(false);
  });

  it('should not allow a non-admin to delete an item', function() {
    $scope.deleteStoreItem();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'You must be logged in as admin to do this.');
  });




});
