var app = angular.module("lehoiviet");

app.service("gatewayService", function($rootScope, ENV) {
  var gatewayService = {};
  var socket = io.connect(ENV.gateWay);

  gatewayService.open = function() {
    console.log("Connected");
    socket.on('connect', function(){
      var data = {};
      data.userId = $rootScope.uid;
      socket.emit('online', data);
    })
  }

  gatewayService.close = function() {
    socket.emit('offline', null);
  }

  return gatewayService;
});
