var live = angular.module("lehoiviet");

live.controller("liveController", function($scope, videoService, dateHelper) {
  $scope.initData = function() {
    getVideo();
  };

  getLives = function() {
    videoService.get(function(response) {
      if (response.status == 200) {
        $scope.videos = response.data.data;
      } else {

      }
    });
  };
});
