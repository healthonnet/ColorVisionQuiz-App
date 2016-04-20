angular.module('app').controller('AppController', function ($scope) {
  document.addEventListener("deviceready", function () {
    //$cordovaPlugin available
    console.log("deviceready");
  }, false);
});
