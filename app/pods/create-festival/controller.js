var createFestival = angular.module("lehoiviet");

createFestival.controller("createFestivalController", function($scope, festivalService,
  categoryService, provinceService, imageService, dateHelper, $window, $compile, $sce) {
  $scope.initData = function() {
    getCategories();
    getProvincies();
    validate();
  };

  getCategories = function() {
    categoryService.get(function(response) {
      if(response.status == 200) {
        $scope.categories = response.data.data;
      }
    });
  };

  getProvincies = function() {
    provinceService.get(function(response) {
      if (response.status == 200){
        $scope.provincies = response.data.data;
      }
    });
  };

  $scope.onChangeTab = function(info){
    $('.infoList li').removeClass('action');
    $('.infoList #' + info).addClass('action');
    $('.infoTab section').addClass('hide');
    $('.' + info + 'Tab').removeClass('hide')
    $window.scrollTo(0, 0); // scroll top
  };

  $scope.onProvinceSelected = function(province) {
    $scope.festival.district = null;
    $scope.districts = province.districts;
  };

  $scope.onCreateFestival = function(){
    var festival = {};
    festival.title = $scope.title;
    festival.description = $scope.description;
    festival.content = $scope.content;
    festival.timeBegin = dateHelper.toDate($scope.timeBegin);
    festival.timeEnd = dateHelper.toDate($scope.timeEnd);
    festival.website = $scope.website;
    festival.emailAddress = $scope.emailAddress;
    festival.phoneNumber = $scope.phoneNumber;
    festival.typeEvent = $scope.typeEvent;
    festival.mainAddress = $scope.mainAddress;
    festival.city = $scope.city;
    festival.district = $scope.district;
    festival.priceTicket = $scope.priceTicket;

    createFestival(festival);
  };

  $scope.onImageSelected = function(element) {
       $scope.$apply(function(scope) {
         $scope.isUploading = true;
          var formData = new FormData();
          formData.append("file", element.files[0]);
          imageService.uploadBackgroundFestival(formData, function(response){
            if(response.status == 200) {
               $scope.backgroundFestival = response.data.data.imgName;
            }
           });
       });
  };

  // image uploaded when image's rendered on screen
  $scope.onImageUploaded = function() {
    $scope.isUploading = false;
  };

  $scope.onSave = function() {
    var festival = {};

    if ($scope.festival == null || $scope.festival == undefined) {
      return;
    }

    festival = $scope.festival;

    $scope.isSaving = true;
    festivalService.save(festival, $scope.festival.id, function(response) {
      if (response.status == 200) {
        $scope.festival.id = $scope.festival.id == null ? response.data.data._id : $scope.festival.id;
        $scope.isSaving = false;
      }
    });
  };

  validate = function() {
    
  }
});
