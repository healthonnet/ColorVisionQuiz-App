describe('ishiharaResultsController', function() {
  beforeEach(angular.mock.module('app'));

  var $controller;
  var q;
  beforeEach(function() {
    spyOn(ons, 'isWebView').and.returnValue(true);
    inject(function(_$controller_) {
      $controller = _$controller_;
    });
    q = {
      correctAnswer: 12,
      redDeficiency: 1,
      greenDeficiency: 2,
      colorBlind: '',
    };
  });

  it('should exist', function() {
    expect($controller).toBeDefined();
  });

  describe('analyseDatas', function() {
    it('should return OK short diag', function() {
      var $scope = {
        short: true,
        answers: [12,12,12,12,12,12,],
        questions: [q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_NORMAL');
      expect(diag.score).toEqual(6);
      expect(diag.rdef).toEqual(0);
      expect(diag.gdef).toEqual(0);
      expect(diag.cb).toEqual(0);
    });

    it('should return Bad short diag', function() {
      var $scope = {
        short: true,
        answers: [12,12,12,12,12,1,],
        questions: [q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_SHOULD_PRECISE');
      expect(diag.score).toEqual(5);
      expect(diag.rdef).toEqual(1);
      expect(diag.gdef).toEqual(0);
      expect(diag.cb).toEqual(0);
    });

    it('should return OK long diag', function() {
      var $scope = {
        short: true,
        answers: [12,12,12,12,12,12,
          12,12,12,12,12,12,12,12,12,
          12,12,'',2,1,],
        questions: [q,q,q,q,q,q,q,
          q,q,q,q,q,q,q,q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_NORMAL');
      expect(diag.score).toEqual(17);
      expect(diag.rdef).toEqual(1);
      expect(diag.gdef).toEqual(1);
      expect(diag.cb).toEqual(1);
    });

    it('should return Red Def long diag', function() {
      var $scope = {
        short: true,
        answers: [1,1,1,1,1,1,
          1,1,1,1,1,12,12,12,12,
          12,2,2,2,'',],
        questions: [q,q,q,q,q,q,q,
          q,q,q,q,q,q,q,q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_DEUTERANOMALY');
      expect(diag.score).toEqual(5);
      expect(diag.rdef).toEqual(11);
      expect(diag.gdef).toEqual(3);
      expect(diag.cb).toEqual(1);
    });

    it('should return Green Def long diag', function() {
      var $scope = {
        short: true,
        answers: [2,2,2,2,2,2,
          2,2,2,2,2,12,12,12,12,
          12,1,1,1,'',],
        questions: [q,q,q,q,q,q,q,
          q,q,q,q,q,q,q,q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_PROTANOMALY');
      expect(diag.score).toEqual(5);
      expect(diag.rdef).toEqual(3);
      expect(diag.gdef).toEqual(11);
      expect(diag.cb).toEqual(1);
    });

    it('should return Color Blind long diag', function() {
      var $scope = {
        short: true,
        answers: ['','','','','','',
          '','','','','',12,12,12,12,
          12,1,1,1,2,],
        questions: [q,q,q,q,q,q,q,
          q,q,q,q,q,q,q,q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_COLOR_BLIND');
      expect(diag.score).toEqual(5);
      expect(diag.rdef).toEqual(3);
      expect(diag.gdef).toEqual(1);
      expect(diag.cb).toEqual(11);
    });

    it('should return suspicious def long diag', function() {
      var $scope = {
        short: true,
        answers: ['','','','','',2,
          2,2,2,1,1,12,12,12,12,
          12,1,1,1,2,],
        questions: [q,q,q,q,q,q,q,
          q,q,q,q,q,q,q,q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_COLOR_DEFICIENCY');
      expect(diag.score).toEqual(5);
      expect(diag.rdef).toEqual(5);
      expect(diag.gdef).toEqual(5);
      expect(diag.cb).toEqual(5);
    });

    it('should return suspicious def long diag', function() {
      var $scope = {
        short: true,
        answers: [12,12,12,12,12,12,
          12,12,12,1,1,12,12,12,12,
          12,1,1,1,2,],
        questions: [q,q,q,q,q,q,q,
          q,q,q,q,q,q,q,q,q,q,q,q,q,],
      };

      $controller('ishiharaResultsController', { $scope: $scope});

      var diag = $scope.analyseDatas();
      expect(diag.title).toEqual('TEST_ISHIHARA_COLOR_DEFICIENCY');
      expect(diag.score).toEqual(14);
      expect(diag.rdef).toEqual(5);
      expect(diag.gdef).toEqual(1);
      expect(diag.cb).toEqual(0);
    });
  });
});
