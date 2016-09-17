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

login.controller("userHandleController", function($scope, $rootScope, userService) {
  $scope.init = function() {
    $scope.message = null;
  };

  $scope.signupView = function(){
      $('#forgot-password').modal('hide');
      $('#dangnhap').modal('hide');
      $('#register').modal('show');
  };
  $scope.loginView = function(){
      $('#register').modal('hide');
      $('#forgot-password').modal('hide');
      $('#dangnhap').modal('show');
      $('#not-signed').modal('hide');
  };
  $scope.forgetPasswordView = function(){
      $('#register').modal('hide');
      $('#dangnhap').modal('hide');
      $('#forgot-password').modal('show');
  };

  $scope.showModal = function(id){
    $('#' + id).modal('show');
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

    userService.login(userInfo, function(response) {
      if (response.status == 200) {
        var data = response.data;
        if (data.token != null) {
          // View Handle
          $('#dangnhap').modal('hide');
          $rootScope.token = data.token;
          $rootScope.email = data.user.email;
          $rootScope.avatar = data.user.avatar;
          $rootScope.firstName = data.user.firstName;
          $rootScope.uid = data.user._id;
          $scope.errorMessage = null;
        } else {
          $scope.errorMessage = "Đăng Nhập Không Thành Công";
        }
      }
    });
  };

  $scope.forgetPassword = function() {

  };
});
