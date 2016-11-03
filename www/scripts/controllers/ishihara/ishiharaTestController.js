angular.module('app')
  .controller('ishiharaTestController', function($scope, $http) {
  console.log('IshiharaTestController');
  var that = this;

  this.shuffle = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      var index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      var temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

  $scope.init = function() {
    $scope.loading = true;
    $scope.currentAnswer = '';
    $scope.quiz = [];
    $scope.answers = [];
    $scope.short = navigatorIshihara.getCurrentPage().options.short;

    $scope.getOrientation();

    window.onresize = function() {
      setTimeout($scope.getOrientation, 1);
    };

    $http.get('./assets/tests/ishihara/plates.json',{
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
    })
      .success(function(data) {
        $scope.quiz = $scope.generateQuiz(data);
        $scope.currentQuestion = 0;
        $scope.totalQuestions = $scope.quiz.length;
        $scope.loading = false;
      })
      .error(function(data) {
        console.error(data);
        $scope.loading = false;
      });
  };

  $scope.getOrientation = function() {
    $scope.orientation = ons.orientation.isPortrait();
    $scope.$apply();
  };

  $scope.generateQuiz = function(data) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var quiz = [];

    // Build short version
    if ($scope.short) {
      quiz.push(data.plates[getRandomInt(1,4)]);
      quiz.push(data.plates[getRandomInt(5,8)]);
      quiz.push(data.plates[getRandomInt(9,12)]);
      quiz.push(data.plates[getRandomInt(13,16)]);
      quiz.push(data.plates[getRandomInt(17,20)]);
    }
    // Complete test
    else {
      quiz = angular.copy(data.plates);
      quiz.shift();
    }
    // Randomize plates
    quiz = that.shuffle(quiz);

    // First plate
    quiz.unshift(data.plates[0]);
    return quiz;
  };

  $scope.answer = function(answer) {
    $scope.answers.push(answer);
    $scope.nextQuestion();
  };

  $scope.nextQuestion = function() {
    if ($scope.currentQuestion + 1 === $scope.totalQuestions) {
      // Push to result page with datas.
      navigatorIshihara.pushPage('views/ishihara/ishihara-results.html',
        { quiz: $scope.quiz, answers: $scope.answers });
    } else {
      $scope.currentQuestion++;
    }
  };
});
