'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('spectatorApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('changes the test output based on change in the yaml spec definition', function () {
    scope.$apply(function(){
      scope.yaml.content = "testtest";
    })

    expect(scope.testScript.content.length).toBeGreaterThan(0);
  });
});
