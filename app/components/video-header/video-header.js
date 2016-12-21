var videoHeader = angular.module("component");

videoHeader.directive("videoHeader", function(){
  return {
        restrict: "E",
        templateUrl: "app/components/video-header/template.html",
        controller: "videoHeaderController"
    };
});

videoHeader.controller("videoHeaderController", function($scope, liveService) {
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'https://api.lehoiviet.vn//uploads/posts/thumbnails/img_full_thumbnail_EXKCdNbfzXKkvLo2GljJ.jpg'
    },
    {
      image: 'https://api.lehoiviet.vn//uploads/posts/thumbnails/img_full_thumbnail_bGEQdtzp5E3btMjlNFmN.jpg'
    },
    {
      image: 'https://api.lehoiviet.vn//uploads/posts/thumbnails/img_full_thumbnail_q66m6hSlQgin5moIoWjJ.jpg'
    },
    {
      image: 'https://api.lehoiviet.vn//uploads/posts/thumbnails/img_full_thumbnail_bGEQdtzp5E3btMjlNFmN.jpg'
    }
  ];
  
  $scope.init = function(){

    $scope.getAllStream();
  };

  $scope.getAllStream = function(){
    liveService.get(function(response){
      $scope.streams = response.data.data;
      if ($scope.streams.length > 0){
          $scope.selectedStream = $scope.streams[0];
          var clientPlayer = new PeerManager();
          clientPlayer.peerInit($scope.selectedStream.streamId);
      }
    });
  };
});
