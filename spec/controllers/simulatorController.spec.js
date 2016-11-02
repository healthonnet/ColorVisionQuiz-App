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

  describe('switchOnAR', function() {
    it('should copy video attributes and play video', function() {
      var $scope = {
        video: that.video,
        videoRight: that.videoRight
      };
      var controller = $controller('simulatorController', { $scope: $scope });

      $scope.video.src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
      $scope.video.play();
      $scope.video.className = 'stereo';
      expect($scope.video.paused).toEqual(false);

      controller.switchOnAR();

      expect($scope.videoRight.paused).toEqual(false);
      expect($scope.videoRight.src).toEqual('http://clips.vorwaerts-gmbh.de/VfE_html5.mp4');
      expect($scope.videoRight.className).toEqual('stereo');
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

      controller.switchOffAR();
      expect($scope.videoRight.paused).toEqual(true);
      expect($scope.videoRight.className).toEqual('');
    });
  });

  describe('stopVideo', function() {
    it('should pause videos and remove sources', function() {
      var $scope = {
        video: that.video,
        videoRight: that.videoRight
      };
      var controller = $controller('simulatorController', { $scope: $scope });
      $scope.videoRight.src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
      $scope.video.src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
      $scope.video.play();
      $scope.videoRight.play();

      expect($scope.video.paused).toEqual(false);
      expect($scope.videoRight.paused).toEqual(false);

      controller.stopVideo();

      expect($scope.video.paused).toEqual(true);
      expect($scope.videoRight.paused).toEqual(true);

      // empty src return test page (verified with video tag log)
      expect($scope.video.src).toEqual('http://localhost:9876/context.html');
      expect($scope.videoRight.src).toEqual('http://localhost:9876/context.html');
    });
  });

  describe('$scope.updateFilter', function() {
    it('should update active filter on video in stereo mode', function() {
      var $scope = {
        video: that.video,
        videoRight: that.videoRight,
        selectedFilter: 'test',
        armode: true
      };
      var controller = $controller('simulatorController', { $scope: $scope });

      $scope.updateFilter();

      expect($scope.video.className).toEqual('stereo testEffect');
      expect($scope.videoRight.className).toEqual('stereo testEffect');
    });

    it('should update active filter on video', function() {
      var $scope = {
        video: that.video,
        selectedFilter: 'test',
        armode: false
      };
      var controller = $controller('simulatorController', { $scope: $scope });

      $scope.updateFilter();

      expect($scope.video.className).toEqual('testEffect');
    });
  });

});
