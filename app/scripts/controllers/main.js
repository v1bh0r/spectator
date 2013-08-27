'use strict';

angular.module('spectatorApp')
    .controller('MainCtrl', function ($scope) {
      $scope.yaml = {
        content: null,
        error: null
      }

      $scope.testScript = {
        content: null,
        error: null
      }

      $scope.$watch('yaml.content', function () {
        try {
          var output = jsyaml.load($scope.yaml.content);
          if (output !== null) {
            $scope.testScript.content = JSON.stringify(output);
          }
          else {
            $scope.testScript.content = null;
          }
          $scope.yaml.error = null;
        }
        catch (e) {
          if ($scope.yaml.content) {
            $scope.yaml.error = e.message;
          }
        }
      });
    });
