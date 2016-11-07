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

menu.controller("menuController", function($scope, $rootScope, cookiesManager, userService, gatewayService, festivalService) {
  $scope.init = function() {

  };
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
      $('#userLogin').modal('show');
    }
  };
  $scope.logout = function() {
    userService.logout(function(response){
      if(response.status == 200) {
        $rootScope.token = null;
        $rootScope.notification.unseen = 0;
        $rootScope.notification = null;
        cookiesManager.removeUser();
        window.location = "#/";
        gatewayService.offline();
      }
    });
  };
  $scope.onClickNotification = function() {
    if ($rootScope.notification.unseen == null) {
      $rootScope.notification.unseen = 0;
    }
    $rootScope.notification.unseen = 0;
  };
});
