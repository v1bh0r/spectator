'use strict';

angular.module('spectatorApp')
    .service('SpecToJasmineConverter', function SpecToJasmineConverter() {
      var service = {
        convert: function (spec) {
          var output = jsyaml.load(spec);
          if (output) {
            return JSON.stringify(output);
          } else {
            return null;
          }
        }
      };
      return service;
    });