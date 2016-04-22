app.controller('simulatorController', function ($scope) {
  console.log('SimulatorController');

  $scope.video = document.querySelector('video');

  function successCallback(stream) {
    console.log('success');
    $scope.video.src = window.URL.createObjectURL(stream);

    navigatorMain.on('postpop', function(event){
      $scope.video.pause();
      $scope.video.src = '';
      stream.getVideoTracks()[0].stop();
    });
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  function onDeviceReady() {

    if (typeof MediaStreamTrack === 'undefined' ||
      typeof MediaStreamTrack.getSources === 'undefined') {
      alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    } else {
      $scope.source = MediaStreamTrack.getSources(function(sources){
        navigator.webkitGetUserMedia({
          audio:false,
          video: {
            optional: [{
              sourceId: sources[2].id || sources[1].id || sources[0].id
            }]
          }
        }, successCallback, errorCallback);
      });
    }
  }

  document.addEventListener('deviceready', onDeviceReady, false);
  onDeviceReady();
});
