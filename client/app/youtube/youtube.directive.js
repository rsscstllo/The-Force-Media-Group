'use strict';

angular.module('fmgApp')
  .directive('youtube', function ($window, $http) {
    return {
      template: '<div id="youtube-player"></div>',
      restrict: 'E',
      scope: {
        height: "@",
        width: "@",
        channelid: "@"
      },
      link: function (scope, element, attrs) {

        // This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // This function creates an <iframe> (and YouTube player) after the API code downloads.
        var player, videoIds;
        $window.onYouTubeIframeAPIReady = function() {

          const part = 'snippet';
          const maxResults = '10';
          const order = 'date';
          const type = 'video';
          const apiKey = 'AIzaSyCDhdYEHiYIz59b9bLGqaQg0Sdw7r35REE';
          const urlString = `https://www.googleapis.com/youtube/v3/search?part=${part}&channelId=${scope.channelid}&maxResults=${maxResults}&order=${order}&type=${type}&key=${apiKey}`;

          $http.get(urlString)
                .then((response) => {

                  const videoIds = response.data.items.map( (item) => {
                    return item.id.videoId;
                  });

                  player = new YT.Player('youtube-player', {
                    height: scope.height,
                    width: scope.width,
                    videoId: videoIds[0],
                    events: {
                      'onReady': onPlayerReady,
                      'onStateChange': onPlayerStateChange
                    }
                  });

                })
                .catch((err) => {
                  console.log('Error trying to search YouTube');
                  console.log(err);
                });
        };

        function onPlayerReady(event) {
          console.log('Player Ready');
          event.target.cuePlaylist({
            list: videoIds
          });
        }

        function onPlayerStateChange(event) {
          console.log(`Player State Changed to: ${event.data}`);
        }

      } // End of link function
    };
  });