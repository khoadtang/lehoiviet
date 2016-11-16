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

  dateHelper.sortBydate = function(data){
    if (data == null || data == undefined) {
      return;
    }

    var events = data;

    for (var i = 0; i < events.length - 1; ++i){
      for (var j = i + 1; j < events.length; ++j){
        if (moment(this.concatDateTime(events[i].dateBegin, events[i].dateEnd)).
              ifAfter(this.concatDateTime(events[j].dateBegin, events[j].dateEnd))) {
          var date = events[i];
          events[i] = events[j];
          events[j] = date;
        }
      }
    }
  };

  dateHelper.concatDateTime = function(date, time){
    var dateTime = data + " " + time;

    return moment(dateTime, "DD-MM-YYYY HH:mm");
  };
  
  return dateHelper;
})
