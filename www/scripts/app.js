var app = angular.module('app', ['onsen', 'pascalprecht.translate', 'ngCordova']);
app.init = function () {
  angular.bootstrap(document, ['app']);
};

// Configuration

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', {
    "KEY": "Value",
    "DIAG_ISHIHARA_NORMAL": "normal vision",
  });
  $translateProvider.translations('fr', {
    "KEY": "Valeur",
    "DIAG_ISHIHARA_NORMAL": "vision normale",
  });

  $translateProvider.preferredLanguage('fr');
}]);
