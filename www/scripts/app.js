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
      locale = navigator.language.substring(0,2);
    }
    if (localStorage) {
      if (localStorage.getItem('locale')) {
        locale = localStorage.getItem('locale');
      }
    }
    // TODO prevent unsupported language

    return locale;
  });

  var styles = [
    { key: 'CHAMBRAY', label: 'Chambray', example: 'chambray',
      href: 'styles/themes/chambray/onsen-css-components.css',},
    { key: 'DARK', label: 'Dark', example: 'dark',
      href: 'styles/themes/dark/onsen-css-components.css',},
    { key: 'NUMERIC', label: 'Numeric', example: 'numeric',
      href: 'styles/themes/numeric/onsen-css-components.css',},
    { key: 'BLUE', label: 'Blue', example: 'blue',
      href: 'styles/themes/blue/onsen-css-components.css',},
  ];
  themerProvider.setStyles(styles);
  themerProvider.storeTheme(true);

  var selected = themerProvider.getStoredTheme() || styles[0].key;
  themerProvider.setSelected(selected);

},]);

