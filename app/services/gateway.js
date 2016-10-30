var app = angular.module("lehoiviet");

app.service("gatewayService", function($rootScope, ENV) {
  var gatewayService = {};
  var socket = io.connect(ENV.gateWay);

  gatewayService.offline = function() {
    socket.emit('offline', null);
  }

  gatewayService.online = function() {
    var data = {};
    data.userId = $rootScope.uid;
    socket.emit('online', data);
  }

  gatewayService.listen = function() {
    socket.on('notification', function(data) {
      if ($rootScope.notification == null) {
        $rootScope.notification = [];
      }
      $rootScope.$apply(function() {
        $rootScope.notification.push(data)
      });
    })
  }
  return gatewayService;
});
