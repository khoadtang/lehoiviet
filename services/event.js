var app = angular.module("lehoiviet");

app.service("eventService", function(net) {
    var eventService = {};

    //

    eventService.create = function(data, eventHandler){
        net.post('/event/create/', data, eventHandler);
    };

    eventService.update = function(data, eventHandler){
        net.post('/event/update/', data, eventHandler);
    };

    eventService.delete = function(data, eventHandler){
        net.post('/event/delete/', data, eventHandler);
    };

    eventService.getList = function(id, eventHandler) {
        net.get('/event/list/'.concat(id), eventHandler);
    };

    eventService.getShow = function(id, eventHandler) {
        net.get('/event/show/'.concat(id), eventHandler);
    };
    
    return eventService;
});
