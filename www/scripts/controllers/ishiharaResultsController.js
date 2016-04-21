angular.module('app').controller('IshiharaResultsController', function ($scope) {
  $scope.analyseDatas = function() {
    var diagnostic = {
      title : "",
      score : 0,
      rdef : 0,
      gdef : 0,
      cb : 0
    };

    $scope.questions.forEach(function(question, index){
      if(question.correctAnswer === $scope.answers[index]){
        diagnostic.score++;
      }
      if (question.colorBlind === $scope.answers[index]){
        diagnostic.cb++;
      }
      if(question.redDeficiency === $scope.answers[index]){
        diagnostic.rdef++;
      }
      if(question.greenDeficiency === $scope.answers[index]){
        diagnostic.gdef++;
      }
    });

    diagnostic.title = "DIAG_ISHIHARA_NORMAL";
    //TODO check how to diag.

    return diagnostic;
  };

  $scope.answers = navigatorIshihara.getCurrentPage().options.answers;
  $scope.questions = navigatorIshihara.getCurrentPage().options.quiz;
  $scope.diagnostic = $scope.analyseDatas();
  console.log($scope.diagnostic);


});
