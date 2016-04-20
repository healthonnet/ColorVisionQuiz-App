var app = angular.module('app', ['onsen', 'pascalprecht.translate', 'ngCordova']);
app.init = function () {
  angular.bootstrap(document, ['app']);
};

// Configuration

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', {
    "KEY": "Value",
  });
  $translateProvider.translations('fr', {
    "KEY": "Valeur",
  });

  $translateProvider.preferredLanguage('fr');
}]);
