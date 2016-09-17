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

menu.controller("menuController", function($scope, $rootScope) {
  $scope.loginView = function(){
      $('#userLogin').modal('show');
  };
  $scope.actionUserPanel = function(){
      console.log('test');
      $('.actionUserPanel .dropdown-menu').slideToggle(600);
  };
  $scope.createFestivalView = function() {
    if ($rootScope.token != null) {
      window.location = "#/festival/create";
    } else {
      $('#not-signed').modal('show');
    }
  }
});
