var video = angular.module("lehoiviet");

video.controller("videoController", function($scope, videoService, dateHelper) {
  $scope.initData = function() {
    getVideo();
  };

  getVideo= function() {
    videoService.get(function(response) {
      if (response.status == 200) {
        $scope.videos = response.data.data;
      } else {

      }
    });
  };
});
