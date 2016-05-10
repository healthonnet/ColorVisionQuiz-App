var app = angular.module('app', ['onsen', 'pascalprecht.translate', 'ngCordova']);
app.init = function () {
  angular.bootstrap(document, ['app']);
};

// Configuration

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', {
    "KEY": "Value",
    "NORMAL": "normal",
    "DEUTERANOPIA": "deuteranopia",
    "PROTANOPIA": "protanopia",
    "TRITANOPIA": "tritanopia",
    "ACHROMATOPSIA": "achromatopsia",
    "BACK": "Back",
    "NEXT": "Next",
    "START": "Start",
    "RESTART": "Restart",
    "RESULTS": "Results",
    "BACK_TO_MENU": "Back to menu",
    "EXPECTED": "Expected",
    "YOUR_ANSWER": "Your answer",
    "COMPLETE_TEST": "Complete Test",
    "YOUR_DIAGNOSTIC": "Your diagnostic",
    "DIAG_ISHIHARA_NORMAL": "normal vision",
    "DIAG_ISHIHARA_PROBLEM": "Diagnostic problem",
    "DIAG_ISHIHARA_COLOR_BLIND": "color blind vision",
    "DIAG_ISHIHARA_COLOR_PROTANOMALY": "Protanomaly suspected",
    "DIAG_ISHIHARA_COLOR_DEUTERANOMALY": "Deuteranomaly suspected",
    "DIAG_ISHIHARA_COLOR_DEFICIENCY": "Color deficiency",
    "DIAG_ISHIHARA_SHOULD_FARNSWORTH": "Average results you should do another test like the farnstorth test",
    "SHORT_TEST": "Short Test"
  });
  $translateProvider.translations('fr', {
    "KEY": "Valeur",
    "NORMAL": "normal",
    "DEUTERANOPIA": "deuteranopie",
    "PROTANOPIA": "protanopie",
    "TRITANOPIA": "tritanopie",
    "ACHROMATOPSIA": "achromatopsie",
    "BACK": "Retour",
    "NEXT": "Suivant",
    "RESTART": "Recommencer",
    "START": "Commencer",
    "RESULTS": "Résultats",
    "BACK_TO_MENU": "Retour au menu",
    "EXPECTED": "Attendu",
    "YOUR_ANSWER": "Votre réponse",
    "COMPLETE_TEST": "Test Complet",
    "YOUR_DIAGNOSTIC": "Votre diagnostic",
    "DIAG_ISHIHARA_NORMAL": "vision normale",
    "DIAG_ISHIHARA_PROBLEM": "problème de diagnostic",
    "DIAG_ISHIHARA_COLOR_BLIND": "DIAG_ISHIHARA_COLOR_BLIND",
    "DIAG_ISHIHARA_PROTANOMALY": "Protanomalie suspectée",
    "DIAG_ISHIHARA_DEUTERANOMALY": "Deuteranomalie suspectée",
    "DIAG_ISHIHARA_COLOR_DEFICIENCY": "Déficience colorimétrique",
    "DIAG_ISHIHARA_SHOULD_FARNSWORTH": "DIAG_ISHIHARA_SHOULD_FARNSWORTH",
    "SHORT_TEST": "Test court"
  });

  $translateProvider.preferredLanguage('fr');
}]);
