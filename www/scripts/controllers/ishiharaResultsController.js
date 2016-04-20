angular.module('app').controller('IshiharaResultsController', function ($scope) {
  console.log(navigatorIshihara.getCurrentPage().options.answers);
  console.log(navigatorIshihara.getCurrentPage().options.quiz);
});
