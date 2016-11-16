var festival = angular.module("lehoiviet");


// for youtube
festival.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

festival.controller("festivalController", function($scope, $rootScope, festivalService, dateHelper, $routeParams, imageService, commentService, $timeout, eventService) {
  $scope.point = 0;
  $scope.editable = -1;
  $scope.editableContent = [];
  $scope.comments = [];
  $scope.album = [];
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

        getEvents($scope.festival._id);
      }
    });
  };

  getEvents = function(festivalId){
    eventService.getAll(festivalId, function(response) {
      if (response.status == 200) {
        $scope.events = response.data.data;

        dateHelper.sortBydate($scope.events);
        console.log($scope.events);
      }
    })
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
    $scope.album = [];
    var festivalId = $routeParams.festivalId;
    if (festivalId < 0 || festivalId == null || festivalId == undefined) {
      return;
    }

    festivalService.getComments(festivalId, function(response){
      $scope.comments = response.data.data;
      for (var i = 0; i < $scope.comments.length; ++i){
        $scope.album.push.apply($scope.album, $scope.comments[i].imageId);
      }
    });
  }

  $scope.watchSlide = function (shownImage) {
    $('#slideImage').modal('show')
    $scope.shownImage = shownImage;
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

  $scope.onUploadEditableImage = function() {
    $('#upEditableImage').on('hidden.bs.modal', function(){
      resetEditableImageSelector();
    });

    if ($rootScope.token == null) {
      $('#userLogin').modal('show');
      return;
    }

    $('#upEditableImage').modal('show');
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

  resetImageSelector = function() {
    $scope.image = null;
    $scope.myCroppedImage = null;
  }

  resetEditableImageSelector  = function(){
    $scope.editableImage = null;
    $scope.myEditableImage = null;
  }

  $scope.onSubmitComment = function() {
    if ($scope.formData == null || $scope.formData == undefined) {
      $scope.formData = new FormData();
    }

    if ($scope.displayImages == null ||  $scope.displayImages == undefined){
       $scope.displayImages = [];
    }
    console.log($scope.displayImages.length);
    for (var i = 0; i < $scope.displayImages.length; ++i){
      $scope.formData.append("files", dataURItoBlob($scope.displayImages[i]));
    }

    $scope.formData.append("content", $scope.comment);
    $scope.isPostingComment = true;
    commentService.create($scope.festival._id, $scope.formData, function(response){
      $scope.displayImages = null;
      $scope.comment = null;
      $scope.formData = null;
      if(response.status == 200) {
        $scope.isPostingComment = false;
        getComments();
        var height = $( document ).height() - $('.comment-render').height();
        $("html, body").stop().animate({scrollTop:height - 200}, '1000', 'swing');
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

    if ($scope.displayImages.indexOf($scope.myCroppedImage) >= 0) {
      $('#duplicated-image').modal('show');
    } else {
      $scope.displayImages.push($scope.myCroppedImage);
    }


    $('#upImage').modal('hide');
  };


  $scope.onAddEditableImage = function(){
    if ($scope.editableData == null || $scope.editableData == undefined){
      $scope.editableData = new FormData();
    }

    if ($scope.editableDisplayImages == null || $scope.editableDisplayImages == undefined) {
      $scope.editableDisplayImages = [];
    }

    if ($scope.editableDisplayImages.indexOf($scope.myEditableCroppedImage) >= 0) {
      $('#duplicated-image').modal('show');
    } else {
      $scope.editableDisplayImages.push($scope.myEditableCroppedImage);
    }


    $('#upEditableImage').modal('hide');
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
    if ($scope.displayImages != null) {
      var index = $scope.displayImages.indexOf($scope.selectedImage);
      console.log(index);
      if (index >= 0){
        $scope.displayImages.splice(index, 1);
        console.log($scope.displayImages);
        $('#delete-image').modal('hide');
        $scope.selectedImage = null;
        return;
      }
    }

    commentService.deleteById($scope.selectedDeleteCommentId, function(response){
      getComments();
      $scope.selectedDeleteCommentId = null;
      $scope.editable = -1;
      $('#delete-image').modal('hide');
    });

    return;
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
    $scope.selectedEditableImage = image;
    $scope.selectedEidtableComment = cmt;
  }

  $scope.onRejectRemoveEditable = function(){
    $('#delete-image-editable').modal('hide');
  }

  $scope.onAcceptRemoveEditable = function(){
    if ($scope.editableDisplayImages != null && $scope.editableDisplayImages.length > 0) {
      var index = $scope.editableDisplayImages.indexOf($scope.selectedEditableImage);

      if (index >= 0){
        $scope.editableDisplayImages.splice(index, 1);
        $scope.selectedEditableImage = null;
        $('#delete-image-editable').modal('hide');
        return;
      }
    }

    var images = $scope.selectedEidtableComment.imageId;
    var indexImage = images.indexOf($scope.selectedEditableImage);
    $('#delete-image-editable').modal('hide');
    if (indexImage >= 0){
        commentService.deleteImage(images[indexImage]._id, function(response){
        $scope.selectedEidtableComment.imageId.splice(indexImage, 1);
        $scope.selectedEidtableComment = null;
        $scope.selectedEditableImage = null;
      });
    }
  }

  $scope.onDeleteComment = function(commentId){
    $('#delete-image').modal("show");
    $scope.selectedDeleteCommentId = commentId;
  }

  $scope.onUpdateComment = function(commentId){
    if ($scope.editableData == null || $scope.editableData == undefined) {
      $scope.editableData = new FormData();
    }

    if ($scope.editableDisplayImages == null || $scope.editableDisplayImages == undefined) {
      $scope.editableDisplayImages = {};
    }
    for (var i = 0; i < $scope.editableDisplayImages.length; ++i){
      $scope.editableData.append("files", dataURItoBlob($scope.editableDisplayImages[i]));
    }

    $scope.editableData.append("content", $scope.editableContent[commentId]);
    $scope.isPostingComment = true;
    commentService.update(commentId, $scope.editableData, function(response){
      if(response.status == 200) {
        $scope.isPostingComment = false;

        $scope.editableDisplayImages = null;
        $scope.editableData = null;

        $scope.editable = -1;
        getComments();
      }
    });
  }

  $scope.closeImmediately = function(){
    $('#duplicated-image').modal('hide');
  }
});
