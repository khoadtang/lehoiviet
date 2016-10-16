var festival = angular.module("lehoiviet");

festival.controller("festivalController", function($scope, $rootScope, festivalService, dateHelper, $routeParams) {
  $scope.initData = function() {
    $rootScope.currentPage = "festival";
    getFestivalById();
  };

  getFestivalById = function() {
    var festivalId = $routeParams.festivalId;
    festivalService.getById(festivalId, function(response) {
      if (response.status == 200) {
        $scope.festival = response.data.data;
        $scope.festival.timeBegin = dateHelper.parse($scope.festival.timeBegin);
        $scope.festival.timeEnd = dateHelper.parse($scope.festival.timeEnd);
      } else {

      }
    });
  };

  $scope.watchSlide = function () {
    $('#slideImage').modal('show')
  }
  $scope.watchVideo = function () {
    $('#watchVideo').modal('show')
  }
  $scope.uploadImage = function () {
    $('#upImage').modal('show')
  }
  $scope.postVideo = function () {
    $('#postVideo').modal('show')
  }
  $scope.rating = function () {
    $('#rating').modal('show')
  }
});
