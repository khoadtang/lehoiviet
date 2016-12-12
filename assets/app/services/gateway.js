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
        var audio = new Audio('./assets/enough.mp3');
        audio.play();
        if($rootScope.notification.unseen == null) {
          $rootScope.notification.unseen = 0;
        }
        $rootScope.notification.unseen++;
        $rootScope.notification.unshift(data);
      });
    });

    socket.on('users', function(data) {
      if ($rootScope.users == null) {
        $rootScope.users = [];
      }

      $rootScope.$apply(function() {
        $rootScope.users = data;
      });
    });
  }
  return gatewayService;
});
