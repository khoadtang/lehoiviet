var app = angular.module("lehoiviet");

app.service("net", function($http, ENV, $rootScope) {
  var netService = {};


  netService.get = function(url, eventHandler) {
    $http.get(ENV.apiUrl + url).then(eventHandler);
  };

  netService.post = function(url, param, eventHandler) {
    $http.defaults.headers.common['Authorization'] = $rootScope.token;
    $http.post(ENV.apiUrl + url, param).then(eventHandler);
  };

  netService.put = function(url, param, eventHandler) {
    $http.put(ENV.apiUrl + url, param).then(eventHandler);
  };

  netService.upload = function(url, param, eventHandler) {
    $http.defaults.headers.common['Authorization'] = $rootScope.token;
    $http.post(ENV.apiUrl + url, param, {headers: {
                    'Content-Type': undefined
                }}).then(eventHandler);
  };

  return netService;
});
