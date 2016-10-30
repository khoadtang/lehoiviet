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

login.controller("userHandleController", function($scope, $rootScope, userService, cookiesManager, gatewayService, $route) {
  $scope.init = function() {
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
    var userInfo = {};
    userInfo.firstName = $scope.firstName;
    userInfo.lastName = $scope.lastName;
    userInfo.email = $scope.email;
    userInfo.password = $scope.password;
    userInfo.gender = $scope.gender;

    userService.signup(userInfo, function(response) {
      if(response.status == 200) {
        $('#register').modal('hide');
        $('#dangnhap').modal('show');
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
