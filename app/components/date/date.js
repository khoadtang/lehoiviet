var date = angular.module("component");

date.directive("date", function(){
  return {
        restrict: "E",
        scope: {
            date: "=data"
        },
        templateUrl: "app/components/date/template.html",
        link: function(scope, element, attrs) {
            console.log("Link");  
            console.log(scope.date);
        }
    };
});
