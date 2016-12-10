var app = angular.module("lehoiviet");

app.service("facebookService", function($http, net, $rootScope) {
    var facebookService = {};

    facebookService.checkFacebookLoginStage = function(callback){
        FB.Event.subscribe('auth.authResponseChange', function(res) {
            if (res.status === 'connected') {
                callback(res);
            }
            else {

            }

        });

    };

    facebookService.login = function(callback){
      FB.login(function(response){
        callback(response);
      }, {scope: 'public_profile,email'});
    };

    facebookService.logout = function(){

    };
    return facebookService;
});
