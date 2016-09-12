var loading = angular.module("component");

loading.directive("loadingItem", function(){
  return {
        restrict: "E",
        scope: {
            url: "@",
            enable: "@"
        },
        templateUrl: "app/components/loading/template.html",
        controller: "loadingController"
    };
});

loading.controller("loadingController", function($scope) {

});
