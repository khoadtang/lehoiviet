var blog = angular.module("lehoiviet");

blog.controller("blogController", function($scope, blogService) {
  $scope.initData = function() {
    getBlogs();
  };

  getBlogs = function() {
    blogService.get(function(response) {
      if (response.status == 200) {
        $scope.blogs = response.data.data;
      } else {

      }
    });
  };
});
