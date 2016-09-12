var blog = angular.module("lehoiviet");

blog.controller("blogController", function($scope, blogService) {
  $scope.initData = function() {
    getBlog();
  };

  getBlog = function() {
    blogService.get(function(response) {
      if (response.status == 200) {
        $scope.blogs = response.data.data;
      } else {

      }
    });
  };
});
