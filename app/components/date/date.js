var date = angular.module("component");

date.directive("dateFormatter", function(){
  return {
        restrict: "E",
        scope: {
            date: "@"
        },
        templateUrl: "app/components/date/template.html",
        controller: "dateController"
    };
});

date.controller("dateController", function($scope, dateHelper) {
  $scope.formatData = function() {
    $scope.date = dateHelper.parse($scope.date);
  }
});
