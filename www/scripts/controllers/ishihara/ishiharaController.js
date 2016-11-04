angular.module('app').controller('ishiharaController', function($scope) {
  console.log('IshiharaController');
  $scope.init = function() {
    $scope.short = true;
    $scope.show = function() {
      modalIshiharaTest.show();
    };
  };
});
