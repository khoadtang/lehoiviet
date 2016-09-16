var net = angular.module("lehoiviet");

net.service("net", function($http, ENV) {
  var netService = {};

  netService.get = function(url, eventHandler) {
    $http.get(ENV.apiUrl + url).then(eventHandler);
  };

  netService.post = function(url, param, eventHandler) {
    $http.post(ENV.apiUrl + url, param).then(eventHandler);
  };

  netService.put = function(url, param, eventHandler) {
    $http.put(ENV.apiUrl + url, param).then(eventHandler);
  };

  return netService;
});
