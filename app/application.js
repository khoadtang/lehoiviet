var app = angular.module("lehoiviet", ["ngRoute", "component"]);

app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl : 'app/pods/home/view.html',
                    controller: "homeController",
                    controllerAs: 'home'
                })
                .when('/festival', {
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
                .when('/festival/create', {
                    templateUrl : 'app/pods/create-festival/view.html',
                    controller: "createFestivalController",
                    controllerAs: 'createFestival'
                })
                .when('/blog/create', {
                    templateUrl : 'app/pods/create-blog/view.html',
                    controller: "createBlogController",
                    controllerAs: 'createBlog'
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
