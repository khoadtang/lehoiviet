var createFestival = angular.module("lehoiviet");

createFestival.controller("createFestivalController", function($scope, festivalService, categoryService, provinceService, dateHelper) {
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
        console.log("Successfull Create");
        $('#post-success').modal('show');
      }
      else {

      }
    });
  };

  $scope.changTab = function(info){
    $('.infoList a').removeClass('action');
    $('.infoList #' + info).addClass('action');
    $('.infoTab section').addClass('hide');
    $('.' + info + 'Tab').removeClass('hide')
  };
  
  $scope.onProvinceSelected = function(province) {
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
    festival.mainAddress = $scope.nameAddress;
    festival.city = $scope.province;
    festival.district = $scope.district;
    festival.priceTicket = $scope.priceTicket;

    createFestival(festival);
  };
});
