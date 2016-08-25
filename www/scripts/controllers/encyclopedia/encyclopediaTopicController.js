angular.module('app').controller('EncyclopediaTopicController', function ($scope) {
  console.log('EncyclopediaTopicController');

  if (!navigatorEncyclopedia.getCurrentPage().options.topic) {
    navigatorEncyclopedia.popPage();
  }
  $scope.topic = navigatorEncyclopedia.getCurrentPage().options.topic;

});
