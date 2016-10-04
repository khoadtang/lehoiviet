var app = angular.module("lehoiviet", ["ngRoute", "component", "ngCookies", "ngSanitize"]);

app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl : 'app/pods/home/view.html',
                    controller: "homeController",
                    controllerAs: 'home'
                })
                .when('/festivals', {
                    templateUrl : 'app/pods/festivals/view.html',
                    controller: "festivalsController",
                    controllerAs: 'festivals'
                })
                .when('/festival/create', {
                    templateUrl : 'app/pods/create-festival/view.html',
                    controller: "createFestivalController",
                    controllerAs: 'createFestival'
                })
                .when('/festival/:festivalId', {
                    templateUrl : 'app/pods/festival/view.html',
                    controller: "festivalController",
                    controllerAs: 'festival'
                })
                .when('/video', {
                    templateUrl : 'app/pods/video/view.html',
                    controller: "videoController",
                    controllerAs: 'video'
                })
                .when('/blog', {
                    templateUrl : 'app/pods/blog/view.html',
                    controller: "blogController",
                    controllerAs: 'blog'
                })
                .when('/blog/create', {
                    templateUrl : 'app/pods/create-blog/view.html',
                    controller: "createBlogController",
                    controllerAs: 'createBlog'
                })
                .when('/user/profile', {
                    templateUrl : 'app/pods/user/view.html',
                    controller: "userController",
                    controllerAs: 'user'
                })
                .when('/account/setting', {
                    templateUrl : 'app/pods/account/view.html',
                    controller: "accountController",
                    controllerAs: 'account'
                })
                .when('/live', {
                    templateUrl : 'app/pods/live/view.html',
                    controller: "liveController",
                    controllerAs: 'live'
                })
                .when('/404', {
                    templateUrl : 'app/pods/404/view.html',
                    controller: "errorController",
                    controllerAs: 'error'
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }]);

app.constant("ENV", {
  apiUrl: "https://lehoiviet.herokuapp.com/api"
});

app.controller("appController", function($scope, $rootScope, userService) {
  $scope.init = function() {
    $rootScope.token = null;

    userService.autoLogin(function(response){
      if(response.status == 200) {
        var data = response.data;
        $rootScope.token = data.token;
        $rootScope.email = data.user.email;
        $rootScope.avatar = data.user.avatar;
        $rootScope.firstName = data.user.firstName;
        $rootScope.uid = data.user._id;
      }
    });
  };
});
