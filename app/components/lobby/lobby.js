var lobby = angular.module("component");

lobby.directive("lobbyEvent", function(){
  return {
        restrict: "E",
        scope: {
            events: "=data",
            title: "@",
            isLoaded: "="
        },
        templateUrl: "app/components/lobby/template.html",
        controller: "lobbyController"
    };
});

lobby.controller("lobbyController", function($scope) {
  $scope.isLoaded = false;


});
