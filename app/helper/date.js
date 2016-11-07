var dateHelper = angular.module("lehoiviet");

dateHelper.service("dateHelper", function(){
  var dateHelper = {};

  dateHelper.toDate = function(date) {
    var getString = date.split(" ");
    var date = getString[0].split("/");
    return date[2] + "-" + date[1] + "-" + date[0] + "T" + getString[1] + "Z"
  };

  dateHelper.parse = function(date) {
    var getString = date.split("T");
    var format = getString[0].split("-");
    var hour = getString[1].split(":");
    return format[2] + "/" + format[1] + "/" + format[0] + " " + hour[0] + ":" + hour[1];
  };

  return dateHelper;
})
