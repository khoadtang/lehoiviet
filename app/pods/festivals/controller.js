var festivals = angular.module("lehoiviet");

festivals.controller("festivalsController", function($scope, $rootScope, festivalService, dateHelper, categoryService) {
  $scope.festivals = [];
  $scope.initData = function() {
    $rootScope.currentPage = "festivals";

    categoryService.get(function(response){
      $scope.categories = response.data.data;
    });

    $("html, body").stop().animate({scrollTop:0}, '1000', 'swing');
    
  };

  $scope.onFilterByLocation = function(){
    if ($scope.location == null || $scope.location == undefined) {
      return;
    }

    festivalService.filterByLocation($scope.location, function(response){
      $scope.festivals = response.data.rows;
    });
  };

  $scope.onFilterByType = function(){
    if ($scope.types == null || $scope.types.length <= 0) {
      return;
    }

    var queryString = "";
    for (var i = 0; i < $scope.types.length; ++i) {
      queryString = queryString + "typeId=" + $scope.types[i];
      if (i < $scope.types.length -1 ) {
        queryString = queryString + "&";
      }
    }

    festivalService.filterByType(queryString, function(response){
      $scope.festivals = response.data.rows;
    });
  };

  $scope.onFilterByDate = function(){
    if($scope.date == null || $scope.date == undefined) {
      return;
    }

    festivalService.filterByDate($scope.date, function(response){
      $scope.festivals = response.data.rows;
    });
  };

  $scope.onFilterByPrice = function(){
    if($scope.price == null || $scope.price == undefined){
      return;
    }

    festivalService.filterByPrice($scope.price, function(response){
      $scope.festivals = response.data.rows;
    });
  };
});
