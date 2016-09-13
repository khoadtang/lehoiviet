var province = angular.module("lehoiviet");

province.service("provinceService", function(net) {
    var provinceService = {};

    provinceService.get = function(eventHandler){
        net.get('/province/lists/', eventHandler);
    };

    return provinceService;
});
