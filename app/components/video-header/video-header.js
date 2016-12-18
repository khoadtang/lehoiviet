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
    clientPlayer.peerInit("5EnXZhWsIAQbr0S5AAA4");
  };
});
