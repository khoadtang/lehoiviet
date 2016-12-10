var live = angular.module("lehoiviet");

live.controller("liveController", function($scope, festivalService, $routeParams, dateHelper, $window) {
    $scope.formatDate = dateHelper.formatDate;

    $scope.client = new PeerManager();
    $scope.mediaConfig = {
        audio: true,
        video: {
            mandatory: {},
            optional: []
        }
    };


    $scope.isStreaming = false;
    $scope.stream = {};

    $scope.init = function(){
      $scope.festivalId = $routeParams.festivalId;
      $scope.stream.preview = $window.document.getElementById('streamPlayer');

      $scope.getFestivalId();
    };

    $scope.getFestivalId = function(){
      festivalService.getById($scope.festivalId, function(response){
        $scope.festival = response.data.data;
      });
    };

    $scope.startStreamming = function(){
      requestUserMedia($scope.mediaConfig).then(function(stream) {
          attachMediaStream($scope.stream.preview, stream);
          $scope.client.setLocalStream(stream);
          $scope.stream.stream = stream;
          // $rootScope.$broadcast('cameraIsOn', true);
      }) .catch(Error('Failed to get access to local media.')).then(function(result){
        $scope.$apply(function(){
          $scope.isStreaming = true;
        });
      });
    };

    $scope.stopStreamming = function(){

    };
});
