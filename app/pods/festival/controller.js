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

  $scope.rating = function () {
    $('#rating').modal('show')
  }

  $scope.onLike = function() {
    if ($rootScope.token == null) {
      $('#not-signed').modal('show');
      return;
    }
  }

  $scope.onUploadImage = function() {
    $('#upImage').on('hidden.bs.modal', function(){
      resetImageSelector();
    });

    if ($rootScope.token == null) {
      $('#not-signed').modal('show');
      return;
    }

    $('#upImage').modal('show');
  }

  $scope.onUploadVideo = function() {
    if ($rootScope.token == null) {
      $('#not-signed').modal('show');
      return;
    }
  }

  $scope.onImageSelected = function(element) {


    $scope.myCroppedImage='';
    var selectedFile = element.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      $scope.$apply(function($scope){
        $scope.image=reader.result;
      });
    }, false);

    reader.readAsDataURL(selectedFile);
  }

  resetImageSelector = function() {
    $scope.image = null;
    $scope.myCroppedImage = null;
  }
});
