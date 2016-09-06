app.controller('simulatorController', function($scope) {
  console.log('SimulatorController');

  function resizeVideo() {
    // TODO dynamic toolbar height
    $scope.videoRight.height = window.innerHeight - 44;
    $scope.video.height = window.innerHeight - 44;
    $scope.videoRight.width = window.innerWidth;
    $scope.video.width = window.innerWidth;
  }

  function switchOnAR() {
    $scope.videoRight.src = $scope.video.src;
    $scope.videoRight.play();
    $scope.videoRight.className = $scope.video.className;
  }

  function switchOffAR() {
    $scope.videoRight.pause();
    $scope.videoRight.className = '';
  }

  function stopVideo() {
    $scope.video.pause();
    $scope.videoRight.pause();
    $scope.video.src = '';
    $scope.videoRight.src = '';

    if ($scope.stream) {
      $scope.stream.getVideoTracks()[0].stop();
    }
  }

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

  // Export functions
  $scope.updateFilter = function() {
    var prefix = '';
    var filter = $scope.selectedFilter.toLowerCase() + 'Effect';
    if ($scope.armode) {
      prefix += 'stereo ';
      $scope.videoRight.className = prefix + filter;
    }
    $scope.video.className = prefix + filter;
  };

  $scope.toggleAR = function() {
    $scope.armode = !$scope.armode;
    if ($scope.armode) {
      switchOnAR();
    } else {
      switchOffAR();
    }
  };

  // Init
  $scope.selectedFilter = 'NORMAL';
  $scope.video = document.querySelector('video#left');
  $scope.videoRight = document.querySelector('video#right');

  // Events
  window.addEventListener('resize', resizeVideo);
  ons.orientation.on('change', function() {
    if (ons.orientation.isPortrait() && $scope.armode) {
      $scope.armode = false;
      switchOffAR();
      $scope.$apply();
    }
  });

  // Load media stream
  if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
    ons.notification.alert({
      message: 'This browser does not support MediaStreamTrack.\n\nTry Chrome.',
      title: 'Support Error',
      buttonLabel: 'OK',
      animation: 'default',
      callback: function() {
        navigatorMain.popPage();
      },
    });
  } else {
    // Deprecated but supported by android webview
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
