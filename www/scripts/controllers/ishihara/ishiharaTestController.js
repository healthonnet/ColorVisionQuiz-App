angular.module('app')
  .controller('IshiharaTestController', function($scope, $http) {
  console.log('IshiharaTestController');

  $scope.loading = true;
  $scope.currentAnswer = '';
  $scope.quiz = [];
  $scope.answers = [];
  $scope.short = navigatorIshihara.getCurrentPage().options.short;

  $scope.getOrientation = function() {
    $scope.orientation = ons.orientation.isPortrait();
    $scope.$apply();
  };
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

  $scope.generateQuiz = function(data) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var quiz = [];

    // Build short version
    if ($scope.short) {
      quiz.push(data.plates[0]);
      quiz.push(data.plates[getRandomInt(1,4)]);
      quiz.push(data.plates[getRandomInt(5,8)]);
      quiz.push(data.plates[getRandomInt(9,12)]);
      quiz.push(data.plates[getRandomInt(13,16)]);
      quiz.push(data.plates[getRandomInt(17,20)]);
    }
    // Complete test
    else {
      quiz = data.plates;
    }
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
