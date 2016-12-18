var users = angular.module("lehoiviet");

users.controller("usersController", function($scope, userService, $rootScope) {
  $scope.init = function(){
    $rootScope.currentPage = "users";
    userService.getAll(function(response){
      $scope.users = response.data.data;
    });
  };
});
