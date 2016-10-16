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

  return gatewayService;
});
