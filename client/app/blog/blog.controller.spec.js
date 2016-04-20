describe('Controller: Blog Controller', function() {
  var $scope, ctrl, $timeout, httpBackend, q;

  /* declare our mocks out here
   * so we can use them through the scope
   * of this describe block.
   */
  var  blogServiceMock,
      commentServiceMock,
      AuthMock,
      toasterMock;

  var sampleBlogResponse = { data: [{
      title: "Fresh Prince of Bel Air",
      body: "It was Philadelphia Born and raised.",
      published: true,
      createdAt: "created at 0",
      updatedAt: "updated at 1"
    },
    {
      title: "This is hidden",
      body: "Secret Message",
      published: false,
      createdAt: "created at 3",
      updatedAt: "updated at 4"
    },
    {
      title: "Sonic The Hedgehog",
      body: "Is Awesome.",
      published: true,
      createdAt: "created at 6",
      updatedAt: "updated at 7"
    }]
  };

  var sampleCommentResponse = { data: [{
      userId: "1",
      blogId: "7",
      body: "Hello World!"
    },
    {
      userId: "2",
      blogId: "8",
      body: "How are you?"
    },
    {
      userId: "3",
      blogId: "9",
      body: "BOOM ROA$TED."
    }]
  };


  // This function will be called before every "it" block.
  // This should be used to "reset" state for your tests.
  beforeEach(function (){
    // Create "spy objects" for our services.
    // This will isolate the controller we're testing from
    // any other code.
    // we'll set up the returns for this later
    blogServiceMock = jasmine.createSpyObj('blogService', ['getAllPosts', 'editPost', 'deletePost', 'createPost', 'togglePublished']);
    commentServiceMock = jasmine.createSpyObj('commentService', ['getAllComments', 'createComment', 'deleteComment']);
    AuthMock = jasmine.createSpyObj('Auth', ['isLoggedIn', 'isAdmin', 'getCurrentUser']);
    toasterMock = jasmine.createSpyObj('toaster', ['a']);

    // load the module you're testing.
    module('fmgApp');

    // INJECT! This part is critical
    // $rootScope - injected to create a new $scope instance.
    // $controller - injected to create an instance of our controller.
    // $q - injected so we can create promises for our mocks.
    // _$timeout_ - injected to we can flush unresolved promises.
    inject(function($controller, $rootScope, $q, _$timeout_, $httpBackend) {
      // create a scope object for us to use.
      $scope = $rootScope.$new();

      // set up the returns for our mocks
      // $q.when(value) creates a resolved promise to value.
      // this is important since our service is async and returns a promise.
      AuthMock.isLoggedIn.and.returnValue(false);
      AuthMock.isAdmin.and.returnValue(false);
      AuthMock.getCurrentUser.and.returnValue(null);
      blogServiceMock.getAllPosts.and.returnValue($q.when(sampleBlogResponse));
      commentServiceMock.getAllComments.and.returnValue($q.when(sampleCommentResponse));

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
      ctrl = $controller('BlogCtrl', {
        $scope: $scope,
        blogService: blogServiceMock,
        commentService: commentServiceMock,
        Auth: AuthMock,
        toasterMock: toasterMock
      });
    });
  });


  it('should start with populated', function() {

    // Just assert. $scope was set up in beforeEach() (above)
    expect($scope.blogs).toEqual([]);
    expect($scope.comments).toEqual([]);
    expect($scope.limit).toEqual(5);
    expect($scope.viewAll).toEqual(true);
    expect($scope.edit).toEqual(false);
  });

  it('should get all of the blogs', function (){
    // Arrange.
    $scope.blogs = [];
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.updateBlogs();

    // Assert.
    expect(blogServiceMock.getAllPosts).toHaveBeenCalled();

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.blogs).toEqual(sampleBlogResponse.data);
  });

  it('should increment limit by 5', function (){
    // Arrange.
    $scope.limit = 5;

    // Act.
    $scope.incrementLimit();

    // Assert.
    expect($scope.limit).toEqual(10);
  });

  it('should change to edit mode FROM true TO false', function (){
    // Arrange.
    $scope.edit = true;

    // Act.
    $scope.editPost();

    // Assert.
    expect($scope.edit).toEqual(false);
  });

  it('should change to edit mode FROM false TO true', function (){
    // Arrange.
    $scope.edit = false;

    // Act.
    $scope.editPost();

    // Assert.
    expect($scope.edit).toEqual(true);
  });

  it('should submit a blog for editting', function() {
    // Arrange.
    $scope.blogs = [];
    $scope.currentBlog = {};
    blogServiceMock.editPost.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.submitEdit();

    // Assert.
    expect(blogServiceMock.editPost).toHaveBeenCalled();

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.blogs).toEqual(sampleBlogResponse.data);
    expect($scope.edit).toEqual(false);
  });

  it('should delete a blog', function() {
    // Arrange.
    $scope.blogs = [];
    const blogpost = { _id: 1000 };
    blogServiceMock.deletePost.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.deletePost(blogpost);

    // Assert.
    expect(blogServiceMock.deletePost).toHaveBeenCalledWith(blogpost);

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.blogs).toEqual(sampleBlogResponse.data);
  });

  it('should toggle the current blog', function (){
    // Arrange.
    $scope.currentBlog = null;
    $scope.viewAll = true;
    const blog = { blog: "ayyy"};

    // Act.
    $scope.toggleView(blog);

    // Assert.
    expect($scope.currentBlog).toEqual(blog);
    expect($scope.viewAll).toEqual(false);
  });

  it('should reset the view', function (){
    // Arrange.
    $scope.viewAll = null;
    $scope.edit = null;

    // Act.
    $scope.resetView();

    // Assert.
    expect($scope.viewAll).toEqual(true);
    expect($scope.edit).toEqual(false);
  });

  it('should create and publish a new blogpost', function() {
    // Arrange.
    $scope.blogpost = {};
    $scope.blogs = [];
    blogServiceMock.createPost.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.createPost();

    // Assert.
    expect(blogServiceMock.createPost).toHaveBeenCalled();

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.blogs).toEqual(sampleBlogResponse.data);
    expect($scope.blogpost.title).toEqual('');
    expect($scope.blogpost.body).toEqual('');
  });

  it('should save the draft of $scope.blogpost', function() {
    // Arrange.
    $scope.blogpost = {};
    $scope.blogs = [];
    blogServiceMock.createPost.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.saveDraft();

    // Assert.
    expect(blogServiceMock.createPost).toHaveBeenCalled();

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.blogs).toEqual(sampleBlogResponse.data);
    expect($scope.blogpost.title).toEqual('');
    expect($scope.blogpost.body).toEqual('');
  });

  it('should get all of the comments', function (){
    // Arrange.
    $scope.comments = [];
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.updateComments();

    // Assert.
    expect(commentServiceMock.getAllComments).toHaveBeenCalled();

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.comments).toEqual(sampleCommentResponse.data);
  });

  it('should fail to get all of the comments', function (){
    // Arrange.
    $scope.comments = [];
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    commentServiceMock.getAllComments.and.returnValue(q.reject({message: 'this is an error message'}));

    // Act.
    $scope.updateComments();

    // Assert.
    expect(commentServiceMock.getAllComments).toHaveBeenCalled();

    $timeout.flush();

    // This makes no sense. should be equal to [].
    expect($scope.comments).toEqual(sampleCommentResponse.data);
  });

  it('should create a comment, then update the comments.', function (){
    // Arrange.
    var expectedComment = {
      body: 'This is my comment',
      blogId: '0',
      userId: '1'
    };
    var expectedComments = sampleCommentResponse.data;
    expectedComments.push(expectedComments);
    $scope.comment = {};
    $scope.currentBlog = {};
    $scope.currentUser = {};

    $scope.comment.text = expectedComment.body;
    $scope.currentBlog._id = expectedComment.blogId;
    $scope.currentUser._id = expectedComment.userId;

    $scope.comments = [];
    commentServiceMock.createComment.and.returnValue(q.when({data: expectedComment}));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.createComment(expectedComment);

    // Assert.
    expect(commentServiceMock.createComment).toHaveBeenCalledWith(expectedComment);

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.comment.text).toEqual('');
    expect($scope.comments).toEqual(expectedComments);
  });

  it('should delete a comment, then update the comments.', function (){
    // Arrange.
    const comment = { _id: 99 };
    $scope.comments = [];
    commentServiceMock.deleteComment.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.deleteComment(comment);

    // Assert.
    expect(commentServiceMock.deleteComment).toHaveBeenCalledWith(comment);

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.comments).toEqual(sampleCommentResponse.data);
  });

  it('should get the number of comments for a given blogpost', function (){
    // Arrange.
    const blogpost = { _id: 1000 };
    $scope.comments = [
      {
        blogId: 1000
      },
      {
        blogId: 0
      },
      {
        blogId: 1000
      }
    ];

    // Act.
    var output = $scope.numComments(blogpost);

    // Assert.
    expect(output).toEqual(2);
  });

  it('should toggle the published field of a blogpost, then update the blogs', function (){
    // Arrange.
    const blogpost = { _id: 1000 };
    $scope.blogs = [];
    blogServiceMock.togglePublished.and.returnValue(q.when(true));
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening

    // Act.
    $scope.togglePublished(blogpost);

    // Assert.
    expect(blogServiceMock.togglePublished).toHaveBeenCalledWith(blogpost);

    // call $timeout.flush() to flush the unresolved dependency from our promise.
    $timeout.flush();

    expect($scope.blogs).toEqual(sampleBlogResponse.data);
  });

});
