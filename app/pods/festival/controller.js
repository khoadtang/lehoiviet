var festival = angular.module("lehoiviet");

festival.controller("festivalController", function($scope, festivalService, dateHelper, $routeParams) {
  $scope.initData = function() {
    getFestivalById();
  };

  getFestivalById = function() {
    var festivalId = $routeParams.festivalId;
    festivalService.getById(festivalId, function(response) {
      if (response.status == 200) {
        $scope.festival = response.data.data;
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
