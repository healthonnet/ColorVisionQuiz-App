var app = angular.module('app',
  ['onsen', 'pascalprecht.translate', 'ngCordova', 'angular-themer']);
app.init = function() {
  angular.bootstrap(document, ['app']);
};

// Configuration

app.config(['$translateProvider', 'themerProvider',
  function($translateProvider, themerProvider) {
  $translateProvider.translations('en', {
    NORMAL: 'normal',
    ABOUT: 'about',
    OPTIONS: 'options',
    HOME: 'home',
    VISION_SIMULATOR: 'vision simulator',
    AR_MODE: 'A.R. mode',
    CLASSIC_MODE: 'classic Mode',
    DEUTERANOPIA: 'deuteranopia',
    PROTANOPIA: 'protanopia',
    TRITANOPIA: 'tritanopia',
    ACHROMATOPSIA: 'achromatopsia',
    ENCYCLOPEDIA: 'encyclopedia',
    BACK: 'back',
    NEXT: 'next',
    START: 'start',
    RESTART: 'restart',
    RESULTS: 'results',
    BACK_TO_MENU: 'back to menu',
    EXPECTED: 'expected',
    YOUR_ANSWER: 'your answer',
    COMPLETE_TEST: 'complete Test',
    YOUR_DIAGNOSTIC: 'your diagnostic',
    DIAG_ISHIHARA_NORMAL: 'normal vision',
    DIAG_ISHIHARA_PROBLEM: 'diagnostic problem',
    DIAG_ISHIHARA_COLOR_BLIND: 'color blind vision',
    DIAG_ISHIHARA_COLOR_PROTANOMALY: 'protanomaly suspected',
    DIAG_ISHIHARA_COLOR_DEUTERANOMALY: 'deuteranomaly suspected',
    DIAG_ISHIHARA_COLOR_DEFICIENCY: 'color deficiency',
    DIAG_ISHIHARA_SHOULD_FARNSWORTH:
      'average results you should do another test like the farnstorth test',
    SHORT_TEST: 'short Test',
    CHANGE_THEME: 'change color theme',
    CHANGE_LANGUAGE: 'change language',
  });
  $translateProvider.translations('fr', {
    NORMAL: 'normal',
    ABOUT: 'à propos',
    OPTIONS: 'options',
    HOME: 'accueil',
    VISION_SIMULATOR: 'simulateur de vision',
    AR_MODE: 'mode R.A',
    CLASSIC_MODE: 'mode classique',
    DEUTERANOPIA: 'deuteranopie',
    PROTANOPIA: 'protanopie',
    TRITANOPIA: 'tritanopie',
    ACHROMATOPSIA: 'achromatopsie',
    ENCYCLOPEDIA: 'encyclopedie',
    BACK: 'retour',
    NEXT: 'suivant',
    RESTART: 'recommencer',
    START: 'commencer',
    RESULTS: 'résultats',
    BACK_TO_MENU: 'retour au menu',
    EXPECTED: 'attendu',
    YOUR_ANSWER: 'votre réponse',
    COMPLETE_TEST: 'test complet',
    YOUR_DIAGNOSTIC: 'votre diagnostic',
    DIAG_ISHIHARA_NORMAL: 'vision normale',
    DIAG_ISHIHARA_PROBLEM: 'problème de diagnostic',
    DIAG_ISHIHARA_COLOR_BLIND: 'DIAG_ISHIHARA_COLOR_BLIND',
    DIAG_ISHIHARA_PROTANOMALY: 'protanomalie suspectée',
    DIAG_ISHIHARA_DEUTERANOMALY: 'deuteranomalie suspectée',
    DIAG_ISHIHARA_COLOR_DEFICIENCY: 'déficience colorimétrique',
    DIAG_ISHIHARA_SHOULD_FARNSWORTH: 'DIAG_ISHIHARA_SHOULD_FARNSWORTH',
    SHORT_TEST: 'test court',
    CHANGE_THEME: 'changer les couleurs',
    CHANGE_LANGUAGE: 'changer de langue',
  });

  $translateProvider.registerAvailableLanguageKeys(['en', 'fr'], {
    en_US: 'en',
    en_UK: 'en',
    fr_FR: 'fr',
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
},]);

