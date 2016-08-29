angular.module('app').controller('AppController', function($scope) {
  document.addEventListener('deviceready', function() {
    // CordovaPlugin available
    console.log('deviceready');
  }, false);

  function pushSimulator() {
    navigatorMain.pushPage('views/simulator.html');
    menu.closeMenu();
  }

  function pushAbout() {
    navigatorMain.pushPage('views/about.html');
    menu.closeMenu();
  }

  $scope.redirectSimulator = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushSimulator,
    });
  };

  $scope.redirectAbout = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushAbout,
    });
  };

});
