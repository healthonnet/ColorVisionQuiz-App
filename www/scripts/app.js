var app = angular.module('app',
  ['onsen', 'pascalprecht.translate',
    'ngCordova', 'ngSanitize', 'angular-themer',]);
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
    var locale = 'fr';
    if (localStorage) {
      if (localStorage.getItem('locale')) {
        locale = localStorage.getItem('locale');
      }
    }

    return locale;
  });

  var styles = [
    { key: 'CHAMBRAY', label: 'Chambray', example: 'chambray',
      href: 'styles/themes/chambray/onsen-css-components.css',},
    { key: 'BLUE', label: 'Blue', example: 'blue',
      href: 'styles/themes/blue/onsen-css-components.css',},
    { key: 'LIGHT', label: 'Light', example: 'light',
      href: 'styles/themes/light/onsen-css-components.css',},
    { key: 'DARK', label: 'Dark', example: 'dark',
      href: 'styles/themes/dark/onsen-css-components.css',},
  ];
  themerProvider.setStyles(styles);
  themerProvider.storeTheme(true);

  var selected = themerProvider.getStoredTheme() || styles[0].key;
  themerProvider.setSelected(selected);

},]);

