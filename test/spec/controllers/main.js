'use strict';

describe('Controller: MainCtrl', function () {

  var mockConverter = {
    fetch: function () {
      return {
        convert: function () {

          return "mock response";
        }
      }
    }};

  // load the controller's module
  beforeEach(function () {
    module('spectatorApp');
    module(function ($provide) {
      $provide.value('Converter', mockConverter);
    });
  });

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
    scope.$apply(function () {
      scope.yaml.content = "testtest";
    })

    expect(scope.testScript.content).toBe("mock response");
  });
});
