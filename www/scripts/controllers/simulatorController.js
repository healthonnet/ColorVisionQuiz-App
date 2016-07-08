app.controller('simulatorController', function ($scope) {
  console.log('SimulatorController');
  $scope.activeFilter = "NORMAL";
  $scope.video = document.querySelector('video');
  window.addEventListener('resize', resizeVideo);

  function successCallback(stream) {
    $scope.video.src = window.URL.createObjectURL(stream);
    resizeVideo();

    navigatorMain.on('postpop', function(event){
      $scope.video.pause();
      $scope.video.src = '';
      stream.getVideoTracks()[0].stop();
    });
  }

  function resizeVideo() {
    //TODO dynamic toolbar height
    $scope.video.height = window.innerHeight - 44;
    $scope.video.width = window.innerWidth;
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  $scope.video = document.querySelector('video');
  window.addEventListener('resize', resizeVideo);

  if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    navigatorMain.popPage();
  } else {
    MediaStreamTrack.getSources(function(sources){
      var targetSourceId;
      if(sources[0])
        targetSourceId = sources[0].id;
      if(sources[1])
        targetSourceId = sources[1].id;
      if(sources[2])
        targetSourceId = sources[2].id;

      navigator.webkitGetUserMedia({
        audio:false,
        video: {
          optional: [{ sourceId: targetSourceId }]
        }
      }, successCallback, errorCallback);
    });
  }

  $scope.deuteranopiaEffect = function(){
    $scope.video.className = "deuteranopiaEffect";
    $scope.activeFilter = "DEUTERANOPIA";
  };

  $scope.protanopiaEffect = function(){
    $scope.video.className = "protanopiaEffect";
    $scope.activeFilter = "PROTANOPIA";
  };

  $scope.tritanopiaEffect = function(){
    $scope.video.className = "tritanopiaEffect";
    $scope.activeFilter = "TRITANOPIA";
  };

  $scope.achromatopsiaEffect = function(){
    $scope.video.className = "achromatopsiaEffect";
    $scope.activeFilter = "ACHROMATOPSIA";
  };

  $scope.resetEffect = function(){
    $scope.video.className = "";
    $scope.activeFilter = "NORMAL";
  };

});
