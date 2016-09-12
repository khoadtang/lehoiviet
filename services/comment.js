var app = angular.module("lehoiviet");

app.service("commentService", function(net) {
    var commentService = {};

    userService.create = function(comment, eventHandler){
        net.post('/comment/create/', comment, eventHandler);
    };

    userService.deleteById = function(id, eventHandler) {
        net.get('/comment/delete/'.concat(id), eventHandler);
    };

    userService.update = function(comment, eventHandler){
        net.post('/comment/update/', comment, eventHandler);
    };
   
    return commentService;
});