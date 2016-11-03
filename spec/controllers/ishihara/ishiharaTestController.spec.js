describe('ishiharaTestController', function() {
  beforeEach(angular.mock.module('app'));

  var $controller;

  beforeEach(function() {
    spyOn(ons, 'isWebView').and.returnValue(true);
    inject(function(_$controller_) {
      $controller = _$controller_;
    });
  });

  it('should exist', function() {
    expect($controller).toBeDefined();
  });

  describe('shuffle', function() {
    it('should shuffle the array', function() {
      var $scope = {};
      var $http = {};
      var array = [0,1,2,3,4,5,6,7,8,9,10];

      var controller =
        $controller('ishiharaTestController', { $scope: $scope, $http: $http});
      expect(controller.shuffle(array.slice(0))).not.toEqual(array);
    });
  });

  describe('$scope.nextQuestion', function() {
    it('should increment currentQuestion', function() {
      var $scope = {
        currentQuestion: 1,
      };
      var $http = {};

      $controller('ishiharaTestController', { $scope: $scope, $http: $http});

      $scope.nextQuestion();

      expect($scope.currentQuestion).toEqual(2);
    });
  });

  describe('$scope.answer', function() {
    it('should push answer to answers', function() {
      var $scope = {
        currentQuestion: 1,
        answers: ['test'],
      };
      var $http = {};

      $controller('ishiharaTestController', { $scope: $scope, $http: $http});

      $scope.answer('test2');

      expect($scope.currentQuestion).toEqual(2);
      expect($scope.answers).toEqual(['test', 'test2']);
    });
  });

  describe('$scope.generateQuiz', function() {
    it('should generate short Quiz', function() {
      var $scope = {
        currentQuestion: 1,
        short: true,
      };
      var $http = {};
      var data = {
        plates: [0,1,2,3,4,5,
        6,7,8,9,10,11,12,13,
        14,15,16,17,18,19,20,],
      };
      $controller('ishiharaTestController', { $scope: $scope, $http: $http});

      var quiz = $scope.generateQuiz(data);
      expect(quiz.length).toEqual(6);
    });
    it('should generate long Quiz', function() {
      var $scope = {
        currentQuestion: 1,
        short: false,
      };
      var $http = {};
      var data = {
        plates: [1,2,3,4,5,
          6,7,8,9,10,11,12,13,
          14,15,16,17,18,19,20,
          21,22,23,24,25,],
      };
      $controller('ishiharaTestController', { $scope: $scope, $http: $http});

      var quiz = $scope.generateQuiz(data);
      expect(quiz.length).toEqual(25);
    });
  });
});
