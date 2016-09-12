var user = angular.module("lehoiviet");

user.service("userService", function(net) {
    var userService = {};

    userService.signup = function(user, eventHandler){
        net.post('/user/signup', user, eventHandler);
    };

     userService.login = function(user, eventHandler){
        net.post('/user/login', user, eventHandler);
    };

    userService.logout = function(eventHandler) {
        net.get("/user/logout", eventHandler);
    };

    userService.postAvatar = function(post, eventHandler){
        net.post('/user/avatar/', post, eventHandler);
    };

    userService.inactive = function(eventHandler) {
        net.get("/user/inactive", eventHandler);
    };

    userService.getById = function(data, eventHandler) {
        net.get('/user/avatar/update/'.concat(data), eventHandler);
    };

    userService.update = function(user, eventHandler){
        net.post('/user/update', user, eventHandler);
    };

    userService.getUserbyId = function(id, eventHandler){
        net.get('/user/show/'.concat(id), eventHandler);
    };

    userService.getAll = function(eventHandler){
        net.get('/user/lists', eventHandler);
    };

    userService.getProfile = function(id, eventHandler){
        net.get('/user/profile', eventHandler);
    };

    userService.changePassword = function(data, eventHandler){
        net.post('/user/password/change/', data, eventHandler);
    };

    return userService;
});
