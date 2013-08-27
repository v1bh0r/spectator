'use strict';

angular.module('spectatorApp')
    .controller('MainCtrl', function ($scope, Converter) {

      var converterSpecToJasmine = null;

      $scope.yaml = {
        content: null,
        error: null
      }

      $scope.testScript = {
        content: null,
        error: null
      }

      $scope.$watch('yaml.content', function () {
        if(converterSpecToJasmine === null){
          converterSpecToJasmine = Converter.fetch('SpecToJasmine');
        }

        try {
          var output = converterSpecToJasmine.convert($scope.yaml.content);
          if (output) {
            $scope.testScript.content = output;
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
