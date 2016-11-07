var login = angular.module("component");

login.directive("userHandler", function(){
  return {
        restrict: "E",
        scope: {
            info: "=data",
            title: "@"
        },
        templateUrl: "app/components/user-handle/template.html",
        controller: "userHandleController"
    };
});

login.controller("userHandleController", function($scope, $rootScope, userService, cookiesManager, gatewayService, festivalService, $route) {
  $scope.init = function() {
    $scope.needAlert = false;
    $scope.alert = "";
    $scope.firstName = null;
    $scope.lastName = null;
    $scope.password = null;
    $scope.gender = null;
    $scope.message = null;
  };
  $scope.showModal = function(id){

    // $('#' + id).modal('show');
    if(id==0){
      $('.carousel').carousel('prev');
    }
    else $('.carousel').carousel('next');

  }

  $scope.signup = function() {
    $scope.needAlert = false;
    $scope.alert = "";

    var userInfo = {};
    userInfo.firstName = $scope.firstName;
    userInfo.lastName = $scope.lastName;
    userInfo.email = $scope.email;
    userInfo.password = $scope.password;
    userInfo.gender = $scope.gender;

    userService.signup(userInfo, function(response) {

      if(response.data.success) {
        cookiesManager.set("email", userInfo.email);
        cookiesManager.set("password", userInfo.password);

        $('#userLogin').modal('hide');

        userService.autoLogin(function(response){
          if(response.status == 200) {
            var data = response.data;
            $rootScope.token = data.token;
            $rootScope.email = data.user.email;
            $rootScope.avatar = data.user.avatar;
            $rootScope.firstName = data.user.firstName;
            $rootScope.uid = data.user._id;

            festivalService.getNotifiedFestival(function(response){
              $rootScope.notification = response.data.data;
              angular.forEach($rootScope.notification, function(value, key){
                if(!value.data.notifyStatus) {
                  if ($rootScope.notification.unseen == null) {
                    $rootScope.notification.unseen = 0;
                  }
                  $rootScope.notification.unseen++;
                }
              });
            });

            gatewayService.online();
            gatewayService.listen();
          }
        });
      } else {
        $scope.needAlert = true;
        var code = response.data.data.code;
        if (code == 0){
          $scope.alert = "Vui Lòng Điền Đầy Đủ Thông Tin";
        } else if (code == 1){
          $scope.alert = "Tài Khoản Đã Tồn Tại";
        }
      }
    });
  };

  $scope.login = function() {
    var userInfo = {};
    userInfo.email = $scope.email;
    userInfo.password = $scope.password;
    if($scope.email != "" &&  $scope.password != "")
    {
        userService.login(userInfo, function(response) {
          if (response.status == 200) {
            var data = response.data;
            if (data.token != null) {
              // View Handle
              $('#userLogin').modal('hide');
              $rootScope.token = data.token;
              $rootScope.email = data.user.email;
              $rootScope.avatar = data.user.avatar;
              $rootScope.firstName = data.user.firstName;
              $rootScope.uid = data.user._id;
              $scope.errorMessage = null;

              cookiesManager.set("email", userInfo.email);
              cookiesManager.set("password", userInfo.password);

              festivalService.getNotifiedFestival(function(response){
                $rootScope.notification = response.data.data;
                angular.forEach($rootScope.notification, function(value, key){
                  if(!value.notifyStatus) {
                    $rootScope.notification.unseen.length++;
                  }
                });
              });

              gatewayService.online();
              gatewayService.listen();
            } else {
              $scope.errorMessage = "Đăng Nhập Không Thành Công";
            }
          }
      });
    }
  };

  $scope.forgetPassword = function() {

  };


});
