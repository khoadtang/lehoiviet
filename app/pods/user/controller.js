var user = angular.module("lehoiviet");

user.controller("userController", function($rootScope, $scope, userService, festivalService, FestivalStatus) {
  $scope.isChangingAvatar = false;

  $scope.initData = function() {
    if ($rootScope.uid == null || $rootScope.uid == undefined) {
      window.location = "#/";
    };
    $rootScope.currentPage = "profile";
    getProfile();
    getFestivals();
  };

  getProfile = function() {
    userService.getProfile($rootScope.uid, function(response){
      $scope.user = response.data.data;
    });
  };

  getFestivals = function(){
    festivalService.getFestivalsByUser(function(response){
      $scope.festivals = response.data.data;
    });
  };

  $scope.onChangeTab = function(info){
    $(".infoTab section").addClass('hide');
    $("." + info + "Tab").removeClass('hide');
    $(".infoList li").removeClass('action');
    $("#" + info).addClass('action')
  };

  $scope.onUpdateProfile = function(){
    $scope.isUpdatingProfile = true;
    userService.update($rootScope.uid, $scope.user, function(response){
      $scope.isUpdatingProfile = false;
    });
  };

  $scope.showModalReset = function () {
    $('#reset-password').modal('show')
  }

  $scope.showModalChangeAvatar = function () {
    $('#upEditableImage').modal('show');
  }

  $scope.onEditableImageSelected = function(element) {

    $scope.myEditableCroppedImage='';
    var selectedFile = element.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      $scope.$apply(function($scope){
        $scope.editableImage=reader.result;
      });
    }, false);

    reader.readAsDataURL(selectedFile);
  }

  $scope.onChangeAvatar = function(){
    var data = new FormData();
    data.append("file", dataURItoBlob($scope.myEditableCroppedImage));

    $scope.isChangingAvatar = true;
    userService.postAvatar(data, function(response){
      $scope.isChangingAvatar = false;
      console.log(response);
    });
  }

  $scope.onEditFestival = function(festivalId){
    window.location = "#/festival/update/".concat(festivalId);
  }
});

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
