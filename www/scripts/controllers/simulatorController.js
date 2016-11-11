app.controller('simulatorController', function($scope, $translate) {
  console.log('SimulatorController');
  var that = this;

  this.resizeVideo = function() {
    $scope.videoRight.height = window.innerHeight - 44;
    $scope.video.height = window.innerHeight - 44;
    $scope.videoRight.width = window.innerWidth;
    $scope.video.width = window.innerWidth;
  };

  this.switchOnAR = function() {
    $scope.videoRight.src = $scope.video.src;
    $scope.videoRight.play();
    $scope.videoRight.className = $scope.video.className;
  };

  this.switchOffAR = function() {
    $scope.videoRight.src = '';
    $scope.videoRight.pause();
    $scope.videoRight.className = '';
  };

  this.stopVideo = function() {
    $scope.video.pause();
    $scope.videoRight.pause();
    $scope.video.src = '';
    $scope.videoRight.src = '';

    if ($scope.stream) {
      $scope.stream.getVideoTracks()[0].stop();
    }
  };

  function successCallback(stream) {
    $scope.stream = stream;
    $scope.video.src = window.URL.createObjectURL(stream);
    that.resizeVideo();

    navigatorMain.on('prepush', that.stopVideo);
    navigatorMain.on('postpop',that.stopVideo);

  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  // Export functions
  $scope.updateFilter = function() {
    if($scope.stopTalking) {
      $scope.stopTalking();
    }
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
      that.switchOnAR();
    } else {
      that.switchOffAR();
    }
  };

  $scope.show = function() {
    modalSimulator.show();
  };

  $scope.readDisease = function(disease) {
    if (!disease) {
      return;
    }
    var lang = $translate.use() === 'fr' ? 'fr-FR' : 'en-GB';
    $translate(disease + '_AUDIO').then(function(translation) {
      $scope.talk({
        text: translation,
        locale: lang,
      });
    });
  };

  // Init
  $scope.init = function() {
    $scope.selectedFilter = 'NORMAL';
    $scope.video = document.querySelector('video#left');
    $scope.videoRight = document.querySelector('video#right');

    // Events
    window.addEventListener('resize', that.resizeVideo);
    ons.orientation.on('change', function() {
      if (ons.orientation.isPortrait() && $scope.armode) {
        $scope.armode = false;
        that.switchOffAR();
        $scope.$apply();
      }
    });
    navigatorMain.on('prepush', $scope.stopTalking);
    navigatorMain.on('prepop', $scope.stopTalking);


    // Load media stream
    if (typeof MediaStreamTrack === 'undefined' ||
      typeof MediaStreamTrack.getSources === 'undefined') {
      ons.notification.alert({
        message: 'This browser does not support MediaStreamTrack.' +
        '\n\nTry Chrome.',
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
  };

});
