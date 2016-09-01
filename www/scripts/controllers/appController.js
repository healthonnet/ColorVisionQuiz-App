angular.module('app').controller('AppController', function($scope, $translate) {
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

  function pushOptions() {
    navigatorMain.pushPage('views/options.html');
    menu.closeMenu();
  }

  function pushColorPicker() {
    navigatorMain.pushPage('views/color-picker.html');
    menu.closeMenu();
  }

  // Export functions
  $scope.redirectSimulator = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushSimulator,
    });
  };

  $scope.redirectOptions = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushOptions,
    });
  };

  $scope.redirectAbout = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushAbout,
    });
  };

  $scope.redirectColorPicker = function() {
    $scope.menu.setMainPage('navigators/navigatorMain.html', {
      callback: pushColorPicker,
    });
  };

  $scope.changeLanguage = function(locale) {
    $translate.use(locale);
    $scope.localeName = locale;
    if (localStorage) {
      localStorage.setItem('locale', locale);
    }
  };

  // Init
  $scope.localeName = $translate.proposedLanguage();
  $scope.locales = $translate.getAvailableLanguageKeys();
});
