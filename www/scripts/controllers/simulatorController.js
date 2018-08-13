app.controller('simulatorController', function($scope, $translate) {
  console.log('SimulatorController');

  $scope.resizeVideo = function() {
    $scope.slider.height = window.innerHeight - 44;
    console.log($scope.slider.height);
  };

  // Export functions
  $scope.updateFilter = function() {
    if ($scope.stopTalking) {
      $scope.stopTalking();
    }
    var prefix = '';
    var filter = $scope.selectedFilter.toLowerCase() + 'Effect';
    $scope.slider.className = prefix + filter;
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

  $scope.imgLibrary = [
    './plates/plate-1.jpg',
    './plates/plate-2.jpg',
    './plates/plate-3.jpg',
    './plates/plate-4.jpg',
  ];

  $scope.nextImg = function() {
    if ($scope.fakeslider === ($scope.imgLibrary.length - 1)) {
      $scope.fakeslider = 0;
    } else {
      $scope.fakeslider++;
    }
  };
  $scope.prevImg = function() {
    if ($scope.fakeslider === 0) {
      $scope.fakeslider = $scope.imgLibrary.length - 1;
    } else {
      $scope.fakeslider--;
    }
  };

  // Init
  $scope.init = function() {
    $scope.selectedFilter = 'NORMAL';
    $scope.slider = document.querySelector('#slider');
    $scope.fakeslider = 0;
    $scope.resizeVideo();

    ons.orientation.on('change',$scope.resizeVideo);
    navigatorMain.on('prepush', $scope.stopTalking);
    navigatorMain.on('prepop', $scope.stopTalking);
  };

});
