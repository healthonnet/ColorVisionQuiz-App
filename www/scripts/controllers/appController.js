angular.module('app').controller('AppController',
  function($scope, $rootScope, $translate) {
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

  // TODO Load articles json file.
  $rootScope.topicsColorblindess = [
    {
      id: 1,
      label: 'INTRODUCTION_TITLE',
      description: 'INTRODUCTION_CONTENT',
      date: '2016-09',
    },
    {
      id: 2,
      label: 'DALTONISM_TITLE',
      description: 'DALTONISM_CONTENT',
      date: '2016-09',
    },
    {
      id: 3,
      label: 'DICROMATE_TITLE',
      description: 'DICROMATE_CONTENT',
      date: '2016-09',
    },
    {
      id: 4,
      label: 'TRICHROMATE_TITLE',
      description: 'TRICHROMATE_CONTENT',
      date: '2016-09',
    },
    {
      id: 5,
      label: 'ACHROMATE_TITLE',
      description: 'ACHROMATE_CONTENT',
      date: '2016-09',
    },
    {
      id: 6,
      label: 'ACQUIRED_TITLE',
      description: 'ACQUIRED_CONTENT',
      date: '2016-09',
    },
  ];
  $rootScope.topicsTests = [
    {
      id: 1,
      label: 'ISHIHARA_TITLE',
      description: 'ISHIHARA_CONTENT',
      image: './assets/plates/plate-1.jpg',
      more: 'ISHIHARA_MORE',
      date: '2016-09',
    },
    {
      id: 2,
      label: 'FARNSWORTH_TITLE',
      description: 'FARNSWORTH_CONTENT',
      date: '2016-09',
    },
  ];
});
