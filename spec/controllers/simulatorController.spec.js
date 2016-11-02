describe('simulatorController', function() {
  beforeEach(angular.mock.module('app'));

  var $controller;
  var that = this;
  beforeEach(function() {
    that.video = document.createElement('video');
    that.videoRight = document.createElement('video');
    spyOn(ons, 'isWebView').and.returnValue(true);
    inject(function(_$controller_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    })
  });

  it('should exist', function() {
    expect($controller).toBeDefined();
  });

  describe('resizeVideo', function() {
    it('should resize videos to window size', function() {
      var $scope = {
        video: that.video,
        videoRight: that.videoRight
      };
      var controller = $controller('simulatorController', { $scope: $scope });

      controller.resizeVideo();
      expect($scope.video.height).toEqual(window.innerHeight - 44);
      expect($scope.videoRight.height).toEqual(window.innerHeight - 44);
      expect($scope.video.width).toEqual(window.innerWidth);
      expect($scope.videoRight.width).toEqual(window.innerWidth);

    });
  });

  describe('switchOffAR', function() {
    it('should pause videoRight and remove classname', function() {
      var $scope = {
        videoRight: that.videoRight
      };
      var controller = $controller('simulatorController', { $scope: $scope });
      $scope.videoRight.play();
      $scope.videoRight.className = 'stereo';
      expect($scope.videoRight.paused).toEqual(false);
      expect($scope.videoRight.className).toEqual('stereo');

      controller.switchOffAR();
      expect($scope.videoRight.paused).toEqual(true);
      expect($scope.videoRight.className).toEqual('');
    });
  });

});
