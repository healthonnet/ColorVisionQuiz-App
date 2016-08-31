app.controller('colorPickerController', function($scope) {
  console.log('ColorPickerController');

  function resizeVideo() {
    // TODO dynamic toolbar height
    $scope.canvas.height = window.innerHeight - 44;
    $scope.canvas.width = window.innerWidth;
  }

  function stopVideo() {
    $scope.video.pause();
    $scope.video.src = '';

    if ($scope.stream) {
      $scope.stream.getVideoTracks()[0].stop();
    }
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  $scope.currentColor = '';
  $scope.currentShade = '';
  $scope.video = document.querySelector('video');
  $scope.canvas = document.querySelector('canvas');
  window.addEventListener('resize', resizeVideo);

  var ctx = $scope.canvas.getContext('2d');
  var i;

  $scope.video.addEventListener('play', function() {
    var $this = this;
    resizeVideo();
    i = window.setInterval(function() {
      var ratio = $this.videoWidth / $this.videoHeight;
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

      ctx.drawImage($this,right, 0, width, height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();

      var colorDatas = ctx.getImageData(centerX, centerY, 10, 10);
      for (var i = 0;i < colorDatas.data.length; i += 4) {
        r += colorDatas.data[i];
        g += colorDatas.data[i + 1];
        b += colorDatas.data[i + 2];
        l++;
      }
      r = Math.round(r / l);
      g = Math.round(g / l);
      b = Math.round(b / l);
      var hexColor = rgbToHex(r, g, b);
      var colorNames = ntc.name(hexColor);

      $scope.currentShade = colorNames[3];
      $scope.currentColor = colorNames[1];
      $scope.$apply();
    }, 1000 / 60);
  }, false);

  $scope.video.addEventListener('pause',function() {
    window.clearInterval(i);
  },false);

  $scope.video.addEventListener('ended',function() {
    clearInterval(i);
  },false);

  function successCallback(stream) {
    $scope.stream = stream;
    $scope.video.src = window.URL.createObjectURL(stream);
    resizeVideo();

    navigatorMain.on('prepush', stopVideo);
    navigatorMain.on('postpop',stopVideo);

  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {

    // TODO onsenUI clean modal
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    navigatorMain.popPage();
  } else {
    MediaStreamTrack.getSources(function(sources) {
      var targetSourceId;
      sources.forEach(function(source) {
        if (source.facing === 'environment') {
          targetSourceId = source.id;
        }
      });
      if (!targetSourceId) {
        if (sources[0]) {
          targetSourceId = sources[0].id;
        }
        if (sources[1]) {
          targetSourceId = sources[1].id;
        }
        if (sources[2]) {
          targetSourceId = sources[2].id;
        }
      }

      console.log(targetSourceId);

      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          optional: [{
            sourceId: targetSourceId,
          },],
        },
      }, successCallback, errorCallback);
    });
  }
});
