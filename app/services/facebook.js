var app = angular.module("lehoiviet");

app.service("facebookService", function($http, net, $rootScope) {
    var facebookService = {};
    facebookService.login = function(){
      FB.login(function(response){
        console.log(response);
      });
    };

    facebookService.logout = function(){

    };
    return facebookService;
});
