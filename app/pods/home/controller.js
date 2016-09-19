var home = angular.module("lehoiviet");

home.controller("homeController", function($scope, festivalService) {

  $scope.initData = function() {
    getCommingSoonFestival();
    getFeaturedFestival();
  };

  getCommingSoonFestival = function() {
    festivalService.getAll(function(response) {
      if (response.status == 200) {
        $scope.commingSoonFestival = response.data.data;
        $scope.isLoaded = true;
      } else {

      }
    });
  };

  getFeaturedFestival = function() {
    festivalService.getAll(function(response) {
      if (response.status == 200) {
        $scope.featuredFestival = response.data.data;
      } else {

      }
    });
  };
});
