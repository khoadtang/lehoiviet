var account = angular.module("lehoiviet");

account.controller("accountController", function($rootScope, $scope, userService) {
  $scope.initData = function() {
    getProfile();
  };

  $scope.changTab = function(info){
    $('.infoList a').removeClass('action');
    $('.infoList #' + info).addClass('action');
    $('.infoTab section').addClass('hide');
    $('.' + info + 'Tab').removeClass('hide')
  },

  getProfile = function() {
    userService.getProfile($rootScope.uid, function(response){
      if (response.status == 200) {
        $scope.user = response.data.data;
      }
    });
  };
});
