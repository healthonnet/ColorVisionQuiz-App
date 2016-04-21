var app = angular.module('app', ['onsen', 'pascalprecht.translate', 'ngCordova']);
app.init = function () {
  angular.bootstrap(document, ['app']);
};

// Configuration

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', {
    "KEY": "Value",
    "BACK": "Back",
    "NEXT": "Next",
    "START": "Start",
    "RESTART": "Restart",
    "RESULTS": "Results",
    "BACK_TO_MENU": "Back to menu",
    "EXPECTED": "Expected",
    "YOUR_ANSWER": "Your answer",
    "YOUR_DIAGNOSTIC": "Your diagnostic",
    "DIAG_ISHIHARA_NORMAL": "normal vision",
  });
  $translateProvider.translations('fr', {
    "KEY": "Valeur",
    "BACK": "Retour",
    "NEXT": "Suivant",
    "RESTART": "Recommencer",
    "START": "Commencer",
    "RESULTS": "Résultats",
    "BACK_TO_MENU": "Retour au menu",
    "EXPECTED": "Attendu",
    "YOUR_ANSWER": "Votre réponse",
    "YOUR_DIAGNOSTIC": "Votre diagnostic",
    "DIAG_ISHIHARA_NORMAL": "vision normale",
  });

  $translateProvider.preferredLanguage('fr');
}]);
