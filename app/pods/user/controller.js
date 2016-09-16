var user = angular.module("lehoiviet");

user.controller("userController", function($rootScope, $scope, userService) {
  $scope.initData = function() {
    getProfile();
  };

  getProfile = function() {
    userService.getProfile($rootScope.uid, function(response){
      if (response.status == 200) {
        $scope.user = response.data.data;
      }
    });
  };

  $scope.changTab = function(info){
    $('.infoList a').removeClass('action');
    $('.infoList #' + info).addClass('action');
    $('.infoTab section').addClass('hide');
    $('.' + info + 'Tab').removeClass('hide')
  };
});
