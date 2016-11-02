describe('colorPickerController', function() {
  beforeEach(angular.mock.module('app'));

  var $controller;

  beforeEach(function() {
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
    it('should resize canvas to window size', function() {
      var $scope = {
        canvas: {
          height: 50,
          width: 50
        }
      };
      var controller = $controller('colorPickerController', { $scope: $scope });

      controller.resizeVideo();
      expect($scope.canvas.height).toEqual(window.innerHeight - 44);
      expect($scope.canvas.width).toEqual(window.innerWidth);

    });
  });

  describe('componentToHex', function() {
    it('should convert to hex value', function() {
      var $scope = {};
      var controller = $controller('colorPickerController', { $scope: $scope });

      var hexValue = controller.componentToHex(15);
      expect(hexValue).toEqual('0f');
    });
  });

  describe('rgbToHex', function() {
    it('should convert to hex color format', function() {
      var $scope = {};
      var controller = $controller('colorPickerController', { $scope: $scope });

      var hexColor = controller.rgbToHex(15,15,15);
      expect(hexColor).toEqual('#0f0f0f');
    });
  });

});
