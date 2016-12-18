var videoHeader = angular.module("component");

videoHeader.directive("videoHeader", function(){
  return {
        restrict: "E",
        templateUrl: "app/components/video-header/template.html",
        controller: "videoHeaderController"
    };
});

videoHeader.controller("videoHeaderController", function($scope) {
  $scope.init = function(){
    var clientPlayer = new PeerManager();
    clientPlayer.peerInit("4zvg6k5S99mWCj3wAAEq");
  };
});
