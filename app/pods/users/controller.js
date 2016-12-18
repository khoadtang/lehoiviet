var users = angular.module("lehoiviet");

users.controller("usersController", function($scope, userService) {
  $scope.init = function(){
    userService.getAll(function(response){
      $scope.users = response.data.data;
      console.log($scope.users);
    });
  };
});
