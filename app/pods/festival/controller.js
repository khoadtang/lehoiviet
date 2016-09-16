var festival = angular.module("lehoiviet");

festival.controller("festivalController", function($scope, festivalService, dateHelper, $routeParams) {
  $scope.initData = function() {
    console.log('InitData');
    getFestivalById();
  };

  getFestivalById = function() {
    console.log("Get Festival By Id");
    var festivalId = $routeParams.festivalId;
    festivalService.getById(festivalId, function(response) {
      if (response.status == 200) {
        $scope.festival = response.data.data;
      } else {

      }
    });
  };
});
