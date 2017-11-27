app.controller('colorPickerController', function($scope) {
  console.log('ColorPickerController');
  var that = this;

  this.resizeVideo = function() {
    // TODO dynamic toolbar height
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

  function successCallback(stream) {
    $scope.stream = stream;
    $scope.video.srcObject = stream;
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


    // Load media stream
    if (typeof navigator.mediaDevices === 'undefined' ||
      typeof navigator.mediaDevices.enumerateDevices === 'undefined') {

      // TODO onsenUI clean modal
      alert('This browser does not support mediaDevices.\n\nTry Chrome.');
      navigatorMain.popPage();
    } else {
      // Deprecated but supported by android webview
      navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
          var camera = [];
          var currCameraIndex = 0;
          var videoContraint = false;

          devices.forEach(function(info) {
            if (info.kind == "videoinput") {
              camera.push(info.deviceId);
            }
          });
          currCameraIndex = camera.length - 1;
          if(camera){
            videoContraint = {
              optional: [{
                sourceId: camera[currCameraIndex]
              }]
            };
          }
          setTimeout(function() {
            navigator.getUserMedia({
              audio: false,
              video: videoContraint
            }, function(stream) {
              console.log('ok');
              successCallback(stream)
            },function(error){
              console.log(error);
              errorCallback(error)
            });
          },10);

      });
    }
  };
});
