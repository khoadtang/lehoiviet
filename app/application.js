var app = angular.module("lehoiviet", ["ngRoute", "component", "ngCookies", "ngSanitize", "ng.ckeditor", "ngImgCrop", "ngMap"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/pods/home/view.html',
            controller: "homeController",
            controllerAs: 'home'
        })
        .when('/festivals', {
            templateUrl: 'app/pods/festivals/view.html',
            controller: "festivalsController",
            controllerAs: 'festivals'
        })
        .when('/festival/create', {
            templateUrl: 'app/pods/create-festival/view.html',
            controller: "createFestivalController",
            controllerAs: 'createFestival'
        })
        .when('/festival/:festivalId', {
            templateUrl: 'app/pods/festival/view.html',
            controller: "festivalController",
            controllerAs: 'festival'
        })
        .when('/festival/update/:festivalId', {
            templateUrl: 'app/pods/create-festival/view.html',
            controller: "createFestivalController",
            controllerAs: 'festival'
        })
        .when('/video', {
            templateUrl: 'app/pods/video/view.html',
            controller: "videoController",
            controllerAs: 'video'
        })
        .when('/blog', {
            templateUrl: 'app/pods/blog/view.html',
            controller: "blogController",
            controllerAs: 'blog'
        })
        .when('/blog/create', {
            templateUrl: 'app/pods/create-blog/view.html',
            controller: "createBlogController",
            controllerAs: 'createBlog'
        })
        .when('/user/profile', {
            templateUrl: 'app/pods/user/view.html',
            controller: "userController",
            controllerAs: 'user'
        })
        .when('/user/profile/:userId', {
            templateUrl: 'app/pods/user/view.html',
            controller: "userController",
            controllerAs: 'user'
        })
        .when('/account/setting', {
            templateUrl: 'app/pods/account/view.html',
            controller: "accountController",
            controllerAs: 'account'
        })
        .when('/lives', {
            templateUrl: 'app/pods/lives/list.html',
            controller: "livesController",
            controllerAs: 'lives'
        })
        .when('/live/create', {
            templateUrl: 'app/pods/create-live/live.html',
            controller: "createLiveController",
            controllerAs: 'createLive'
        })
        // .when('/live/:streamId', {
        //     templateUrl: 'app/pods/create-live/view.html',
        //     controller: "createLiveController",
        //     controllerAs: 'createLive'
        // })
        .when('/live/:festivalId', {
            templateUrl: 'app/pods/live/view.html',
            controller: "liveController",
            controllerAs: 'live'
        })
        .when('/404', {
            templateUrl: 'app/pods/404/view.html',
            controller: "errorController",
            controllerAs: 'error'
        })
        .otherwise({
            redirectTo: '/404'
        });
}]);

app.constant("ENV", {
    apiUrl: "http://125.253.113.15:3000",
    gateWay: "http://125.253.113.15:3000"

    /*apiUrl: "http://api.lehoiviet.vn",
    gateWay: "http://api.lehoiviet.vn"*/
});

app.constant("FestivalStatus", {
    "1": "Bản Nháp",
    "2": "Chờ Duyệt",
    "3": "Đã Duyệt"
});

app.controller("appController", function($scope, $rootScope, userService, gatewayService, festivalService, $route, FestivalStatus) {
    $scope.init = function() {

        $rootScope.status = FestivalStatus;
        $rootScope.token = null;

        userService.autoLogin(function(response) {
            var data = response.data;
            $rootScope.token = data.token;
            $rootScope.email = data.user.email;
            $rootScope.avatar = data.user.avatar;
            $rootScope.firstName = data.user.firstName;
            $rootScope.uid = data.user._id;

            festivalService.getNotifiedFestival(function(response) {
                $rootScope.notification = response.data.data;
                angular.forEach($rootScope.notification, function(value, key) {
                    if (!value.data.notifyStatus) {
                        if ($rootScope.notification.unseen == null) {
                            $rootScope.notification.unseen = 0;
                        }
                        $rootScope.notification.unseen++;
                    }
                });
            });

            gatewayService.online();
            gatewayService.listen();

        });
    };
});
