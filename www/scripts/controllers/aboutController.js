angular.module('app').controller('AboutController', function($scope) {
  console.log('AboutController');
  $scope.openExternalLink = function(link) {
    window.open(link,
      '_system', 'location=yes');
  };
});
