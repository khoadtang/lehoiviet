var festival = angular.module("lehoiviet");

festival.controller("festivalController", function($scope, $rootScope, festivalService, dateHelper, $routeParams, imageService, commentService) {
  $scope.initData = function() {
    $rootScope.currentPage = "festival";
    getFestivalById();
  };

  getFestivalById = function() {
    var festivalId = $routeParams.festivalId;
    festivalService.getById(festivalId, function(response) {
      if (response.status == 200) {
        $scope.festival = response.data.data;
        $scope.festival.timeBegin = dateHelper.parse($scope.festival.timeBegin);
        $scope.festival.timeEnd = dateHelper.parse($scope.festival.timeEnd);

        updateLikeElementState();
      } else {

      }
    });
  };

  updateLikeElementState = function() {
    if ($scope.festival != null || $scope.festival != undefined) {
      festivalService.checkUserLike($scope.festival._id, function(response) {
        if (response.data.data.code == 0) {
          var classOfLikeButton = $('.fa-thumbs-o-down');

          classOfLikeButton.addClass('fa-thumbs-o-up');
          classOfLikeButton.removeClass('fa-thumbs-o-down');
        } else {
          var classOfLikeButton = $('.fa-thumbs-o-up');

          classOfLikeButton.addClass('fa-thumbs-o-down');
          classOfLikeButton.removeClass('fa-thumbs-o-up');
        }
      });

      festivalService.getNumberOfLikes($scope.festival._id, function(response) {
        $scope.festival.statistic.likes = (typeof response.data.data == "number") ? response.data.data : 0;
      });
    }
  };

  updateRatingElementState = function() {
    if ($scope.festival != null || $scope.festival != undefined) {

    }
  };

  $scope.watchSlide = function () {
    $('#slideImage').modal('show')
  }

  $scope.watchVideo = function () {
    $('#watchVideo').modal('show')
  }

  $scope.postVideo = function () {
    $('#postVideo').modal('show');
  }

  $scope.onLike = function() {
    if ($rootScope.token == null) {
      $('#userLogin').modal('show');
      return;
    }

    festivalService.like($scope.festival._id, function(response) {
      updateLikeElementState();
    });
  }

  $scope.onRate = function() {
    console.log("On Rate");
    if ($rootScope.token == null) {
      $('#userLogin').modal('show');
      return;
    }

    var data = {};
    data.point = $scope.point;
    festivalService.rate($scope.festival._id, data, function(response) {
      console.log(response);
    });
  }

  $scope.onUploadImage = function() {
    $('#upImage').on('hidden.bs.modal', function(){
      resetImageSelector();
    });

    if ($rootScope.token == null) {
      $('#userLogin').modal('show');
      return;
    }

    $('#upImage').modal('show');
  }

  $scope.onUploadVideo = function() {
    if ($rootScope.token == null) {
      $('#not-signed').modal('show');
      return;
    }
  }

  $scope.onImageSelected = function(element) {
    $scope.myCroppedImage='';
    var selectedFile = element.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      $scope.$apply(function($scope){
        $scope.image=reader.result;
      });
    }, false);

    reader.readAsDataURL(selectedFile);
  }

  resetImageSelector = function() {
    $scope.image = null;
    $scope.myCroppedImage = null;
  }

  $scope.onSubmitImage = function() {
    var formData = new FormData();
    formData.append("file", dataURItoBlob($scope.myCroppedImage));
    imageService.uploadImagePost($scope.festival._id, formData, function(response){
      if(response.status == 200) {
        console.log("Upload Successfully");
      }
    });
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
