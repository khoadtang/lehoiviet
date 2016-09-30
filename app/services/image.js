var app = angular.module("lehoiviet");

app.service("imageService", function(net) {
    var imageService = {};

    imageService.uploadBackgroundFestival = function(data, eventHandler) {
        console.log("Upload Image");
        net.upload('/image/upload/thumbnail/festival/', data, eventHandler);
    };

    imageService.uploadPost = function(data, eventHandler){
        net.post('/upload/image/post/', data, eventHandler);
    };
    imageService.uploadThumbnailPost = function(data, eventHandler){
        net.post('/upload/thumbnail/post/', data, eventHandler);
    };
    imageService.uploadReview = function(data, eventHandler){
        net.post('/upload/image/review/', data, eventHandler);
    };
    imageService.uploadThumbnailReview = function(data, eventHandler){
        net.post('/upload/thumbnail/review/', data, eventHandler);
    };

    return imageService;
});
