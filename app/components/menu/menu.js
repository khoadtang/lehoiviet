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

menu.controller("menuController", function($scope, $rootScope, cookiesManager, userService, gatewayService) {
  $scope.loginView = function(){
      $('#userLogin').modal('show');
      // $('#userLogin').modal('show');
  };
    /*$scope.testView = function(){
        $('#modalBudget').modal('show');
        console.log('davo')
    };*/
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
      console.log(response.status);
      if(response.status == 200) {
        console.log("Log out");
        $rootScope.token = null;
        cookiesManager.removeUser();
        window.location = "#/";
        gatewayService.offline();
      }
    });
  };
});
