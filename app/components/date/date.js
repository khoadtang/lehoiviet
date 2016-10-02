var date = angular.module("component");

date.directive("date",["dateHelper", function(dateHelper){
  return {
        restrict: "E",
        scope: {
            date: "=data"
        },
        templateUrl: "app/components/date/template.html",
        link: function(scope, element, attrs) {
          var NameDay = {
            "Monday": "Thứ 2",
            "Tuesday": "Thứ 3",
            "Wendesday": "Thứ 4",
            "Thursday": "Thứ 5",
            "Friday": "Thứ 6",
            "Saturday": "Thứ 7",
            "Sunday": "Chủ Nhật"
          };

          if (scope.date == null || scope.date == undefined) {
            return;
          }

          var data = dateHelper.parse(scope.date);
          var date = moment(data, "DD-MM-YYYY HH:mm");

          scope.date.day = NameDay[date.format("dddd")];
          scope.date.month = date.format("MM");
          scope.date.year = date.format("YYYY");
        }
    };
}]);
