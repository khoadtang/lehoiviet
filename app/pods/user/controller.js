var user = angular.module("lehoiviet");

user.controller("userController", function($rootScope, $scope, userService, festivalService, FestivalStatus) {
  $scope.initData = function() {
    if ($rootScope.uid == null || $rootScope.uid == undefined) {
      window.location = "#/";
    };
    $rootScope.currentPage = "profile";
    getProfile();
    getFestivals();
  };

  getProfile = function() {
    userService.getProfile($rootScope.uid, function(response){
      $scope.user = response.data.data;
    });
  };

  getFestivals = function(){
    festivalService.getFestivalsByUser(function(response){
      $scope.festivals = response.data.data;
    });
  };

  $scope.onChangeTab = function(info){
    $(".infoTab section").addClass('hide');
    $("." + info + "Tab").removeClass('hide');
    $(".infoList li").removeClass('action');
    $("#" + info).addClass('action')
  };

  $scope.onUpdateProfile = function(){
    $scope.isUpdatingProfile = true;
    userService.update($rootScope.uid, $scope.user, function(response){
      $scope.isUpdatingProfile = false;
    });
  };

  $scope.onEditFestival = function(festivalId){
    window.location = "#/festival/update/" + festivalId;
  };

  $scope.onDelete = function(){

  };
});
