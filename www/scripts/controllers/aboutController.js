angular.module('app').controller('AboutController', function($scope) {
  console.log('AboutController');
  $scope.openExternalLink = function() {
    window.open('https://hon.ch/20-years/fr/a-propos.html',
      '_system', 'location=yes');
  };
});
