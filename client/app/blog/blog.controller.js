'use strict';

angular.module('fmgApp')
  .controller('BlogCtrl', function ($scope, $http) {
    $scope.blogs = [];
    $scope.limit = 5;
    $scope.message = 'Hello';
    $scope.viewAll = true;
    $scope.edit = false;
    $scope.isLoggedIn = false;
    $scope.isAdmin = false;

    $http.get('api/blogs').then(function(response) {
        console.log(response);
        $scope.blogs = response.data;
    });

    $scope.updateBlogs = function() {
        $http.get('api/blogs').then(function(response) {
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
        $http.put('api/blogs/'+$scope.currentBlog._id, $scope.currentBlog).then(function(response) {
            console.log(response);
            $scope.updateBlogs();
            $scope.edit = false;
        });
    }
    $scope.deletePost = function(blog) {
        $http.delete('api/blogs/'+blog._id).then(function(response) {
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
        $http.post('/api/blogs', $scope.blogpost).then(function(response) {
            $scope.blogpost.title="";
            $scope.blogpost.body="";
            console.log(response);
            $scope.updateBlogs();
        });
    }
  });
