var festival = angular.module("lehoiviet");


// for youtube
festival.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

festival.controller("festivalController", function($scope, $rootScope, festivalService, dateHelper, $routeParams, imageService, commentService, $timeout) {
  $scope.point = 0;
  $scope.initData = function() {
    // add listener
    $('#watchVideo').on('hidden.bs.modal', function () {
      $('iframe').attr('src', $('iframe').attr('src'));
    })

    $rootScope.currentPage = "festival";
    $scope.isUploading = false;
    $scope.srcVideo = "https://www.youtube.com/embed/nfwm4uesyFY";
    getFestivalById();
    getComments();
  };

  getFestivalById = function() {
    var festivalId = $routeParams.festivalId;
    festivalService.getById(festivalId, function(response) {
      if (response.status == 200) {
        $scope.festival = response.data.data;
        $scope.festival.timeBegin = dateHelper.parse($scope.festival.timeBegin);
        $scope.festival.timeEnd = dateHelper.parse($scope.festival.timeEnd);

        updateLikeElementState();
        updateSubscribeElementState();
        festivalService.checkUserRate(festivalId, function(response){
          if (response.status == 200){
            var rate = response.data.data.point;
            if (rate == null || rate == undefined) {
              $scope.point = 0;
            } else {
              $scope.point = rate;
            }

            if ($scope.point > 0){
              $('#rating-bar-rated').barrating({
                  initialRating: $scope.point,
                  theme: 'bootstrap-stars',
                  showSelectedRating: false,
                  readonly: $scope.point > 0,
              });
            }
          }
        });
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

  updateSubscribeElementState = function() {
    if ($scope.festival != null || $scope.festival != undefined) {
      festivalService.isSubscribed($scope.festival._id, function(response) {

      });
    }
  }

  getComments = function(){
    var festivalId = $routeParams.festivalId;
    if (festivalId < 0 || festivalId == null || festivalId == undefined) {
      return;
    }

    festivalService.getComments(festivalId, function(response){
      $scope.comments = response.data.data;
    });
  }

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
    if ($scope.point <= 0) {
      return;
    }
    if ($rootScope.token == null) {
      $('#userLogin').modal('show');

      $scope.point = 0;
      return;
    }

    var data = {};
    data.point = $scope.point;
    $('#rating-bar-rated').barrating({
        initialRating: $scope.point,
        theme: 'bootstrap-stars',
        showSelectedRating: false,
        readonly: $scope.point > 0,
    });
    festivalService.rate($scope.festival._id, data, function(response) {

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

  $scope.onSubmitComment = function() {
    if ($scope.formData == null || $scope.formData == undefined) {
      $scope.formData = new FormData();
    }
    $scope.formData.append("content", $scope.comment);
    $scope.isPostingComment = true;
    commentService.create($scope.festival._id, $scope.formData, function(response){
      if(response.status == 200) {
        $scope.isPostingComment = false;

        $scope.displayImages = null;
        $scope.comment = null;
        var height = $( document ).height() - $('.comment-render').height();
        $("html, body").stop().animate({scrollTop:height - 400}, '1000', 'swing');
      }
    });
  }

  $scope.onAddImage = function(){
    if ($scope.formData == null || $scope.formData == undefined){
      $scope.formData = new FormData();
    }

    if ($scope.displayImages == null || $scope.displayImages == undefined) {
      $scope.displayImages = [];
    }

    $scope.displayImages.push($scope.myCroppedImage);
    $scope.formData.append("files", dataURItoBlob($scope.myCroppedImage));
    $('#upImage').modal('hide');
  };

  $scope.onSubscribe = function() {
    if ($scope.festival == null || $scope.festival == undefined) {
      return;
    }

    festivalService.subscribe($scope.festival._id, function(response){
      updateSubscribeElementState();
    });
  }

  $scope.onUnsubscribe = function() {
    if ($scope.festival == null || $scope.festival == undefined) {
      return;
    }

    festivalService.unsubscribe($scope.festival._id, function(response){
      updateSubscribeElementState();
    });
  }

  $scope.onDeleteImage = function (img) {
    $('#delete-image').modal('show');
    $scope.selectedImage = img;
  }

  $scope.onAcceptRemove = function(){
    var index = $scope.displayImages.indexOf($scope.selectedImage);

    if (index >= 0){
      $scope.displayImages.splice(index, 1);
      $('#delete-image').modal('hide');
      $scope.selectedImage = null;
    }
  }

  $scope.onRejectRemove = function(){
    $('#delete-image').modal('hide');
  }

  $scope.onEditableMode = function(commentId, content){
    $scope.editable = commentId;
    $scope.editable.content = content;
  }

  $scope.onDeleteImageEditableMode = function(cmt, image){
    $('#delete-image-editable').modal('show');
  }

  $scope.onRejectRemoveEditable = function(){
    $('#delete-image-editable').modal('hide');
  }

  $scope.onAcceptRemoveEditable = function(cmt, image){

    var index = $scope.comments.indexOf(cmt);
    if (index >= 0) {
      var comment = $scope.comments[index];
      var images = comment.imageId;
      var indexImage = images.indexOf(image);
      $('#delete-image-editable').modal('hide');
      if (indexImage >= 0){
        commentService.deleteImage(images[indexImage]._id, function(response){

          images.splice(indexImage, 1);

        });
      }
    }
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
