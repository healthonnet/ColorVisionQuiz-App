angular.module('app').controller('IshiharaResultsController', function ($scope) {
  $scope.short = false;

  $scope.analyseDatas = function() {
    var diagnostic = {
      title : "",
      score : 0,
      rdef : 0,
      gdef : 0,
      cb : 0
    };

    $scope.questions.forEach(function(question, index){
      if(question.correctAnswer == $scope.answers[index]){
        diagnostic.score++;
      }
      else if(question.redDeficiency == $scope.answers[index] || question.greenDeficiency == $scope.answers[index]){
        if(question.redDeficiency == $scope.answers[index]){
          diagnostic.rdef++;
        }
        if(question.greenDeficiency == $scope.answers[index]){
          diagnostic.gdef++;
        }
      }
      else if (question.colorBlind == $scope.answers[index]){
        diagnostic.cb++;
      }
    });

    diagnostic.title = "DIAG_ISHIHARA_PROBLEM";

    //If Short test (6 plates)
    if($scope.questions.length === 6){
      $scope.short = true;

      // If not perfect => should do long diagnostic
      if(diagnostic.score < 6 ){
        diagnostic.title = "DIAG_ISHIHARA_SHOULD_PRECISE"
      } else {
        diagnostic.title = "DIAG_ISHIHARA_NORMAL";
      }
    }
    // Complete Test
    else {
      switch (true) {
        case (diagnostic.score >= 17):
          diagnostic.title = "DIAG_ISHIHARA_NORMAL";
          break;
        case (diagnostic.score >= 14 && diagnostic.score <= 16):
          diagnostic.title = "DIAG_ISHIHARA_SHOULD_FARNSWORTH";
          break;
        case (diagnostic.score <= 13):
          if(diagnostic.gdef < diagnostic.cb && diagnostic.gdef < diagnostic.cb){
            diagnostic.title = "DIAG_ISHIHARA_COLOR_BLIND";
          }
          else if(diagnostic.rdef > diagnostic.gdef){
            diagnostic.title = "DIAG_ISHIHARA_DEUTERANOMALY";
          }
          else if(diagnostic.rdef < diagnostic.gdef){
            diagnostic.title = "DIAG_ISHIHARA_PROTANOMALY";
          }
          else {
            diagnostic.title = "DIAG_ISHIHARA_COLOR_DEFICIENCY";
          }
          break;
      }
    }

    return diagnostic;
  };

  $scope.answers = navigatorIshihara.getCurrentPage().options.answers;
  $scope.questions = navigatorIshihara.getCurrentPage().options.quiz;
  $scope.diagnostic = $scope.analyseDatas();

});
