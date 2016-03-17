'use strict';

angular.module('fmgApp')
  .controller('BlogCtrl', function ($scope, blogService, Auth) {
    $scope.blogs = [];
    $scope.limit = 5;
    $scope.message = 'Hello';
    $scope.viewAll = true;
    $scope.edit = false;
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.currentUser = Auth.getCurrentUser();
    console.log(Auth);

    blogService.getAllPosts().then(function(response) {
        console.log(response);
        $scope.blogs = response.data;
    });

    $scope.updateBlogs = function() {
        blogService.getAllPosts().then(function(response) {
            console.log(response);
            $scope.blogs = response.data;
        });
    }
    $scope.incrementLimit = function() {
        $scope.limit+=5;
    }
    $scope.editPost = function() {
        $scope.edit = !$scope.edit;
    };
    $scope.submitEdit= function() {
        $scope.currentBlog.updatedAt = moment().format('MMMM Do YYYY h:mm:ss a');

        blogService.editPost($scope.currentBlog).then(function(response) {
            console.log(response);
            $scope.updateBlogs();
            $scope.edit = false;
        });
    }
    $scope.deletePost = function(blog) {
        blogService.deletePost(blog).then(function(response) {
            console.log(response);
            $scope.updateBlogs();
        });
    };
    $scope.toggleView = function(blog) {
        $scope.currentBlog = blog;
        $scope.viewAll = ! $scope.viewAll;
    }
    $scope.resetView = function() {
        $scope.viewAll = true;
        $scope.edit = false;
    }
    $scope.saveDraft = function() {
        console.log("save draft")
    }
    $scope.createPost = function() {
        $scope.blogpost.published = true;
        $scope.blogpost.createdAt = moment().format('MMMM Do YYYY h:mm:ss a');
        $scope.blogpost.updatedAt = moment().format('MMMM Do YYYY h:mm:ss a');
        blogService.createPost($scope.blogpost).then(function(response) {
            $scope.blogpost.title="";
            $scope.blogpost.body="";
            console.log(response);
            $scope.updateBlogs();
        });
    }
  });
