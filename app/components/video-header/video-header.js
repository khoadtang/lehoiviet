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
      image: 'http://lorempixel.com/400/200/'
    },
    {
      image: 'http://lorempixel.com/400/200/food'
    },
    {
      image: 'http://lorempixel.com/400/200/sports'
    },
    {
      image: 'http://lorempixel.com/400/200/people'
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
