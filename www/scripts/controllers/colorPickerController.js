app.controller('colorPickerController', function($scope, $translate) {
  console.log('ColorPickerController');
  var that = this;

  var permissions = cordova.plugins.permissions;

  this.resizeVideo = function() {
    $scope.canvas.height = window.innerHeight - 44;
    $scope.canvas.width = window.innerWidth;
  };

  this.stopVideo = function() {
    $scope.video.pause();
    $scope.video.src = '';

    if ($scope.stream) {
      $scope.stream.getVideoTracks()[0].stop();
    }
  };

  this.componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  this.rgbToHex = function(r, g, b) {
    return '#' + this.componentToHex(r) +
      this.componentToHex(g) + this.componentToHex(b);
  };

  $scope.readColor = function(color) {
    if (!color) {
      return;
    }
    var lang = $translate.use() === 'fr' ? 'fr-FR' : 'en-GB';
    $translate(color).then(function(translation) {
      $scope.talk({
        text: translation,
        locale: lang,
      });
    });
  };

  function successCallback(stream) {
    $scope.stream = stream;

    try {
      $scope.video.srcObject = stream;
    } catch (error) {
      $scope.video.src = window.URL.createObjectURL(stream);
    }

    that.resizeVideo();

    navigatorMain.on('prepush', that.stopVideo);
    navigatorMain.on('postpop', that.stopVideo);

  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  this.getShades = function() {
    var ctx = $scope.canvas.getContext('2d');

    var ratio = this.videoWidth / this.videoHeight;
    var height = $scope.canvas.clientHeight;
    var width = height * ratio;
    var right = ($scope.canvas.clientWidth - width) / 2;

    var centerX = $scope.canvas.width / 2;
    var centerY = $scope.canvas.height / 2;
    var radius = 10;
    var r = 0;
    var g = 0;
    var b = 0;
    var l = 0;

    ctx.drawImage(this, right, 0, width, height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();

    var colorDatas = ctx.getImageData(centerX, centerY, 5, 5);
    for (var i = 0;i < colorDatas.data.length; i += 4) {
      r += colorDatas.data[i];
      g += colorDatas.data[i + 1];
      b += colorDatas.data[i + 2];
      l++;
    }
    r = Math.round(r / l);
    g = Math.round(g / l);
    b = Math.round(b / l);
    var hexColor = that.rgbToHex(r, g, b);
    var colorNames = ntc.name(hexColor);
    $scope.currentShade = colorNames[3];
    $scope.currentColor = colorNames[1];
  };

  $scope.requestVideo = function() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: {facingMode: {exact: 'environment'}},
      })
        .then(function(stream) {
          successCallback(stream);
        })
        .catch(function(error) {
          errorCallback(error);
        });
    } else {
      // TODO onsenUI clean modal
      alert('This browser does not support mediaDevices.\n\nTry Chrome.');
      navigatorMain.popPage();
    }
  };

  // Init
  $scope.init = function() {
    $scope.show = function() {
      modalColorPicker.show();
    };
    $scope.currentColor = '';
    $scope.currentShade = '';
    $scope.video = document.querySelector('video');
    $scope.canvas = document.querySelector('canvas');
    var i;

    // Events
    window.addEventListener('resize', that.resizeVideo);
    $scope.video.addEventListener('play', function() {
      var $this = this;
      that.resizeVideo();
      i = window.setInterval(function() {
          that.getShades.bind($this)();
          $scope.$apply();
        }, 1000 / 60);
    }, false);

    $scope.video.addEventListener('pause',function() {
      window.clearInterval(i);
    },false);

    $scope.video.addEventListener('ended',function() {
      clearInterval(i);
    },false);

    navigatorMain.on('prepush', $scope.stopTalking);
    navigatorMain.on('prepop', $scope.stopTalking);

    // Load media stream
    permissions.checkPermission(permissions.CAMERA, function(status) {
      if (status.hasPermission) {
        $scope.requestVideo();
      } else {
        permissions.requestPermission(permissions.CAMERA, function(status) {
          if (status.hasPermission) {
            $scope.requestVideo();
          } else {
            navigatorMain.popPage();
          }
        }, function() {
          navigatorMain.popPage();
        });
      }
    }, function() {
      navigatorMain.popPage();
    });
  };
});
