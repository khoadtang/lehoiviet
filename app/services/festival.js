var app = angular.module("lehoiviet");

app.service("festivalService", function($http, net, $rootScope) {
    var festivalService = {};

    festivalService.create = function(festival, eventHandler){
        festival.userId = $rootScope.uid;
        net.post('/festival/create/', festival, eventHandler);
    };

    festivalService.save = function(festival, festivalId, eventHandler){
        festival.userId = $rootScope.uid;
        if (festivalId == -1 || festivalId == null || festivalId == undefined) {
          net.post('/festival/save/', festival, eventHandler);
        } else {
          net.post('/festival/save/'.concat(festivalId), festival, eventHandler);
        }
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
