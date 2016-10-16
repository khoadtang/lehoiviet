var live = angular.module("lehoiviet");

live.controller("liveController", function($scope, $rootScope, videoService, dateHelper) {
  $scope.initData = function() {
    $rootScope.currentPage = "live";
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
