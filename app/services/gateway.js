var app = angular.module("lehoiviet");

app.service("gatewayService", function($rootScope, ENV) {
  var gatewayService = {};

  gatewayService.open = function() {
    var socket = io.connect(ENV.gateWay);

    socket.on('connect', function(){
      var data = {};
      data.userId = $rootScope.uid;
      socket.emit('online', data);
    })
  }

  return gatewayService;
});
