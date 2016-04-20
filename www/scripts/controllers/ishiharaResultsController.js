angular.module('app').controller('IshiharaResultsController', function ($scope) {
  $scope.answers = navigatorIshihara.getCurrentPage().options.answers;
  $scope.questions = navigatorIshihara.getCurrentPage().options.quiz;
});
