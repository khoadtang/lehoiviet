var app = angular.module("lehoiviet");

app.service("festivalService", function(net, $rootScope) {
    var festivalService = {};

    festivalService.create = function(festival, eventHandler){
        festival.Authorization = $rootScope.token;
        net.post('/festival/create/', festival, eventHandler);
    };

    festivalService.update = function(festival, eventHandler){
        net.post('/festival/update/', festival, eventHandler);
    };

    festivalService.delete = function(festival, eventHandler){
        net.post('/festival/delete/', festival, eventHandler);
    };

    festivalService.getAll = function(eventHandler) {
        net.get('/festival/lists/', eventHandler);
    };

    festivalService.getById = function(id, eventHandler) {
        net.get('/festival/show/'.concat(id), eventHandler);
    };

    return festivalService;
});
