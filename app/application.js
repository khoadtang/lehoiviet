var app = angular.module("lehoiviet", ["ngRoute", "component"]);

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
                .when('/festival/create', {
                    templateUrl : 'app/pods/create-festival/view.html',
                    controller: "createFestivalController",
                    controllerAs: 'createFestival'
                })
                .when('/blog/create', {
                    templateUrl : 'app/pods/create-blog/view.html',
                    controller: "createBlogController",
                    controllerAs: 'createBlog'
                }).when('/user/profile', {
                    templateUrl : 'app/pods/user/view.html',
                    controller: "userController",
                    controllerAs: 'user'
                }).when('/account/setting', {
                    templateUrl : 'app/pods/account/view.html',
                    controller: "accountController",
                    controllerAs: 'account'
                }).when('/festival/:festivalId', {
                    templateUrl : 'app/pods/festival/view.html',
                    controller: "festivalController",
                    controllerAs: 'festival'
                })
        }]);

app.constant("ENV", {
  apiUrl: "https://lehoiviet.herokuapp.com/api"
});

app.controller("appController", function($scope, $rootScope) {
  $scope.init = function() {
    $rootScope.token = null;
  };
});
