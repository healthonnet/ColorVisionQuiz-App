angular.module('app').controller('EncyclopediaController', function ($rootScope) {
  console.log('EncyclopediaController');

  //TODO get article list on init. Dist json ?
  $rootScope.topics = [
    {
      id: 1,
      label: 'a topic',
      description: 'description topic',
      date: '2016-08-25',
      author: 'me'
    },
    {
      id: 2,
      label: '2 a topic',
      description: '2 description topic',
      date: '2016-08-26',
      author: 'me'
    }
  ];
});
