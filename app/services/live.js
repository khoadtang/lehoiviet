var app = angular.module("lehoiviet");

app.service("liveService", function(net) {
    var liveService = {};

    liveService.create = function(data, eventHandler){
        net.post('/live/create/', data, eventHandler);
    };

    liveService.update = function(data, eventHandler){
        net.post('/live/update/', data, eventHandler);
    };

    liveService.get = function(eventHandler) {
        net.get('/live/lists/', eventHandler);
    };

    liveService.getByAuthor = function(id, eventHandler) {
        net.get('/live/user/'.concat(id), eventHandler);
    };

    liveService.getByPost = function(id, eventHandler) {
        net.get('/live/post/'.concat(id), eventHandler);
    };

    liveService.delete = function(id, eventHandler) {
        net.get('/live/delete/'.concat(id), eventHandler);
    };
    return liveService;
});
