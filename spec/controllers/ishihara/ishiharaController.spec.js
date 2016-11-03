describe('ishiharaController', function() {
  beforeEach(angular.mock.module('app'));

  var $controller;

  beforeEach(function() {
    spyOn(ons, 'isWebView').and.returnValue(true);
    inject(function(_$controller_) {
      $controller = _$controller_;
    });
  });

  it('should exist', function() {
    expect($controller).toBeDefined();
  });

  describe('init', function() {
    it('should short to be true by default', function() {
      var $scope = {};

      $controller('ishiharaController', { $scope: $scope });
      $scope.init();
      expect($scope.short).toBe(true);
    });
  });
});
