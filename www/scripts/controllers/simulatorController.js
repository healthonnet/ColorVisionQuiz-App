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
  }

  function switchOffAR() {
    $scope.videoRight.pause();
  }

  $scope.selectedFilter = 'NORMAL';
  $scope.video = document.querySelector('video#left');
  $scope.videoRight = document.querySelector('video#right');
  window.addEventListener('resize', resizeVideo);


  function successCallback(stream) {
    $scope.video.src = window.URL.createObjectURL(stream);
    resizeVideo();

    navigatorMain.on('prepush', function() {
      $scope.video.pause();
      $scope.videoRight.pause();
      $scope.video.src = '';
      $scope.videoRight.src = '';
      stream.getVideoTracks()[0].stop();
    });
    navigatorMain.on('postpop', function() {
      $scope.video.remove();
      $scope.videoRight.remove();
      stream.getVideoTracks()[0].stop();
    });
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

  $scope.updateFilter = function() {
    var prefix = '';
    if ($scope.armode) {
      prefix += 'stereo ';
    }
    $scope.video.className = prefix +
    $scope.selectedFilter.toLowerCase() + 'Effect';
    $scope.videoRight.className = prefix +
    $scope.selectedFilter.toLowerCase() + 'Effect';
  };

  $scope.toggleAR = function() {
    $scope.armode = !$scope.armode;
    if ($scope.armode) {
      switchOnAR();
    } else {
      switchOffAR();
    }
  };
});
