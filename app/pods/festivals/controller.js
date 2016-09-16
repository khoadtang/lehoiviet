var festivals = angular.module("lehoiviet");

festivals.controller("festivalsController", function($scope, festivalService, dateHelper) {
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
