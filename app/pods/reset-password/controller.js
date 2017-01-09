var resetPassword = angular.module("lehoiviet");

resetPassword.controller("resetPasswordController", function($scope, userService, $routeParams) {
  $scope.init = function(){

  };

  $scope.resetPassword = function(){
    var data = {};
    data.token = $routeParams.token;
    data.newPassword = $scope.newPassword;

    userService.resetPassword(data, function(response){
      console.log(response);
    });
  }
});
