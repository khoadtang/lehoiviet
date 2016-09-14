var festival = angular.module("lehoiviet");

festival.controller("festivalController", function($scope, festivalService, dateHelper) {
  $scope.initData = function() {
    getFestival();
  };

  getFestival = function() {
    festivalService.getAll(function(response) {
      if (response.status == 200) {
        $scope.festivals = response.data.data;
      } else {

      }
    });
  };
});
