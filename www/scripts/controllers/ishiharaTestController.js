angular.module('app').controller('IshiharaTestController', function ($scope, $http) {
  console.log('IshiharaTestController');
  $scope.loading = true;
  $scope.currentAnswer = "";
  $scope.quiz = [];
  $scope.answers = [];

  $http.get('./assets/tests/ishihara/plates.json',{
    headers:{"Content-type": "application/json; charset=utf-8"}
  }).
    success(function (data) {
      console.log(data);
      $scope.quiz = $scope.generateQuiz(data);

      $scope.currentQuestion = 0;
      $scope.totalQuestions = $scope.quiz.length;

      $scope.loading = false;
    })
    .error(function (data, status, headers, config) {
      console.error(data);
      $scope.loading = false;
    });

  $scope.generateQuiz = function(data) {
    return data.plates;
  };

  $scope.nextQuestion = function (){
    $scope.answers.push($scope.currentAnswer);
    if($scope.currentQuestion + 1 == $scope.totalQuestions){
      //Push to result page with datas.
      navigatorIshihara.pushPage('views/ishihara-results.html', { quiz: $scope.quiz, answers: $scope.answers })
    } else {
      $scope.currentQuestion++;
      $scope.currentAnswer = "";
    }
  };
});
