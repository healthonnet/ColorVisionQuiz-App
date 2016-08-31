var app = angular.module('app',
  ['onsen', 'pascalprecht.translate', 'ngCordova', 'angular-themer']);
app.init = function() {
  angular.bootstrap(document, ['app']);
};

// Configuration

app.config(['$translateProvider', 'themerProvider',
  function($translateProvider, themerProvider) {

  $translateProvider.registerAvailableLanguageKeys(['en', 'fr'], {
    en_US: 'en',
    en_UK: 'en',
    fr_FR: 'fr',
  });

  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/locale-',
    suffix: '.json',
  });

  $translateProvider.determinePreferredLanguage(function() {
    var locale = 'en';
    if (navigator.language) {
      locale = navigator.language;
    }
    if (localStorage) {
      if (localStorage.getItem('locale')) {
        locale = localStorage.getItem('locale');
      }
    }
    return locale;
  });

  var styles = [
    { key: 'CHAMBRAY', label: 'Chambray Theme',
      href: 'styles/themes/chambray/onsen-css-components.min.css',},
    { key: 'DARK', label: 'Dark Theme',
      href: 'styles/themes/dark/onsen-css-components.min.css',},
  ];
  themerProvider.setStyles(styles);
  themerProvider.storeTheme(true);

  var selected = themerProvider.getStoredTheme() || styles[0].key;
  themerProvider.setSelected(selected);

},]);

