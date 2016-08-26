angular.module('app').controller('AppController', function ($scope) {
  document.addEventListener('deviceready', function () {
    //$cordovaPlugin available
    console.log('deviceready');
  }, false);

  function pushSimulator() {
    navigatorMain.pushPage('views/simulator.html', {closeMenu: true});
  }

  function pushAbout() {
    navigatorMain.pushPage('views/about.html', {closeMenu: true});
  }

  $scope.redirectSimulator = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushSimulator
    });
  };


  $scope.redirectAbout = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushAbout
    });
  };

});
