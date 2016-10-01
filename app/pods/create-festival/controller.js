var createFestival = angular.module("lehoiviet");

createFestival.controller("createFestivalController", function($scope, festivalService,
  categoryService, provinceService, imageService, dateHelper, $window) {
  $scope.initData = function() {
    getCategories();
    getProvincies();
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

  createFestival = function(data) {
    festivalService.create(data, function(response) {
      if (response.status == 200) {
        $('#post-success').modal('show');
      }
      else {

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
    $scope.districts = province.districts;
  };

  $scope.gotoDetail = function (tab) {
    $scope.changTab(tab);

  }

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
    festival.mainAddress = $scope.nameAddress;
    festival.city = $scope.province;
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

  $scope.createEventFestival = function(){
    $('.box-event').toggleClass('hide');
  };

  $scope.onSave = function() {
    console.log("Save");
    var festival = {};
    festival.title = $scope.title;

    festivalService.save(festival, function(response) {
      if (response.status == 200) {
        console.log("Completed Save");
      }
    });
  };
});
