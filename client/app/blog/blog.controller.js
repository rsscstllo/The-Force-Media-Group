'use strict';


angular.module('fmgApp')
  .controller('BlogCtrl', function ($scope, toaster, commentService) {
    $scope.comments = [];

    commentService.getAllComments()
      .then(function(response){
        $scope.comments = response.data;
      }).catch(function(err){
        console.log(err);
      });

    $scope.createComment= function (){
      var text = $scope.comment.text;

      if (text === ""){
         toaster.pop("error","Please enter text.");
         return;
      }

      var commentToCreate = {
        blogId: "string1",
        userId: "string2",
        body: text
      };
      commentService.createComment(commentToCreate)
        .then(function (response){
          var comment = response.data;
          toaster.pop("success","Comment submitted");
          $scope.comment.text = "";
          console.log(comment);
          $scope.comments.push(comment);
        }).catch(function(err){
          console.log(err);
        });
    };
  });
