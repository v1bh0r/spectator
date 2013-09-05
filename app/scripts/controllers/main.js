'use strict';

angular.module('spectatorApp')
    .controller('MainCtrl', function ($scope, Converter) {
      var LOCAL_STORAGE_KEY = "last-spec";

      var converterSpecToJasmine = null;

      var saveSpecs = _.debounce(function (spec) {
        localStorage.setItem(LOCAL_STORAGE_KEY, spec);
      }, 1000);

      var loadSavedSpecs = function () {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
      }

      $scope.engineReady = false;

      $scope.yaml = {
        content: null,
        error: null
      }

      $scope.testScript = {
        content: null,
        error: null
      }

      Converter.fetch('SpecToJasmine').then(function (converter) {
        converterSpecToJasmine = converter;
        $scope.engineReady = true;
        var savedSpecs = loadSavedSpecs();
        if (savedSpecs) {
          $scope.yaml.content = savedSpecs
        } else {
          $scope.yaml.content = "Service - Contact:\n    - has a name\n    - has an address:\n        - has pin code\n        - has street number";
        }
      });

      $scope.$watch('yaml.content', function () {
        saveSpecs($scope.yaml.content);
        if (converterSpecToJasmine) {
          converterSpecToJasmine.convert($scope.yaml.content)
              .then(function (output) {
                if (output) {
                  $scope.testScript.content = output;
                }
                else {
                  $scope.testScript.content = null;
                }
                $scope.yaml.error = null;
              }, function (message) {
                if ($scope.yaml.content) {
                  $scope.yaml.error = message;
                }
              });
        }

      });
    });
