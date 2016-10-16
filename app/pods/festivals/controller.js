var festivals = angular.module("lehoiviet");

festivals.controller("festivalsController", function($scope, $rootScope, festivalService, dateHelper) {
  $scope.initData = function() {
    $rootScope.currentPage = "festivals";
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
