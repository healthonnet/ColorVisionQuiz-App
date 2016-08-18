angular.module('app').controller('AppController', function ($scope) {
  document.addEventListener("deviceready", function () {
    //$cordovaPlugin available
    console.log("deviceready");
  }, false);

  $scope.redirectSimulator = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushSimulator
    });
  };

  function pushSimulator() {
    navigatorMain.pushPage('views/simulator.html', {closeMenu: true});
  }

  $scope.redirectAbout = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushAbout
    });
  };

  function pushAbout() {
    navigatorMain.pushPage('views/about.html', {closeMenu: true});
  }


});
