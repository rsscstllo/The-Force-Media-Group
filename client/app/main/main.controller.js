// 'use strict';
//
// (function() {
//
// class MainController {
//
//   constructor($http, colorService) {
//     this.$http = $http;
//     this.awesomeThings = [];
//
//     colorService.getAllColors()
//       .then(function(response) {
//         var colors = response.data;
//
//         $('.deepSeaBackground').css("background-color": colors[0].colorCode);
//         $('.deepSeaColor').css("color": colors[0].colorCode);
//
//         $('.skyBlueBackground').css("background-color": colors[1].colorCode);
//         $('.skyBlueColor').css("color": colors[1].colorCode);
//
//         $('.crestBackground').css("background-color": colors[2].colorCode);
//         $('.crestColor').css("color": colors[2].colorCode);
//
//         $('.sadDayBackground').css("background-color": colors[3].colorCode);
//         $('.sadDayColor').css("color": colors[3].colorCode);
//
//         $('.cloudyBackground').css("background-color": colors[4].colorCode);
//         $('.cloudyColor').css("color": colors[4].colorCode);
//
//       }).catch(function(err) {
//           console.log(err);
//       });
//
//     $http.get('/api/things').then(response => {
//       this.awesomeThings = response.data;
//     });
//   }
//
//   addThing() {
//     if (this.newThing) {
//       this.$http.post('/api/things', { name: this.newThing });
//       this.newThing = '';
//     }
//   }
//
//   deleteThing(thing) {
//     this.$http.delete('/api/things/' + thing._id);
//   }
// }
//
// angular.module('fmgApp')
//   .controller('MainController', MainController);
//
// })();

'use strict';

angular.module('fmgApp')
  .controller('MainController', function ($scope, toaster, colorService, $http) {
    $scope.awesomeThings = [];

    colorService.getAllColors()
      .then(function(response) {
        var colors = response.data;

        $('.deepSeaBackground').css({"background-color": colors[0].colorCode});
        $('.deepSeaColor').css({"color": colors[0].colorCode});

        $('.skyBlueBackground').css({"background-color": colors[1].colorCode});
        $('.skyBlueColor').css({"color": colors[1].colorCode});

        $('.crestBackground').css({"background-color": colors[2].colorCode});
        $('.crestColor').css({"color": colors[2].colorCode});

        $('.sadDayBackground').css({"background-color": colors[3].colorCode});
        $('.sadDayColor').css({"color": colors[3].colorCode});

        $('.cloudyBackground').css({"background-color": colors[4].colorCode});
        $('.cloudyColor').css({"color": colors[4].colorCode});

      }).catch(function(err) {
          console.log(err);
      });

      $scope.addThing = function() {
        if($scope.newThing) {
          $http.post('/api/things', { name: this.newThing });
        }
      }

      $scope.deleteThing = function() {
        $http.delete('/api/things/' + thing._id);
      }
  });
