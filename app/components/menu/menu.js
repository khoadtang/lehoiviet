var menu = angular.module("component");

menu.directive("topMenu", function(){
  return {
        restrict: "E",
        scope: {
            events: "=data"
        },
        templateUrl: "app/components/menu/template.html",
        controller: "menuController"
    };
});

menu.controller("menuController", function($scope, $rootScope, cookiesManager, userService) {
  $scope.loginView = function(){
      $('#userLogin').modal('show');
  };
  $scope.actionUserPanel = function(){
      $('.actionUserPanel .dropdown-menu').toggle();
  };
  $scope.createFestivalView = function() {
    if ($rootScope.token != null) {
      window.location = "#/festival/create";
    } else {
      $('#not-signed').modal('show');
    }
  };
  $scope.logout = function() {
    userService.logout(function(response){
      if(response.status == 200) {
        $rootScope.token = null;
        cookiesManager.removeUser();
      }
    });
  };
});
