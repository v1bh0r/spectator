'use strict';

angular.module('spectatorApp')
    .service('SpecToJasmineConverter', function SpecToJasmineConverter($http, $q) {
      var definitionTemplate, exampleTemplate;

      var getSubElements = function (element) {
        var subElements = translate(element);
        return subElements;
      }
      var translate = function (node) {
        var output = "";
        if (node instanceof Array) {
          angular.forEach(node, function (element) {
            output += getSubElements(element);
          });
        } else {
          switch (typeof node) {
            case 'object':
              angular.forEach(node, function (element, name) {
                output += definitionTemplate({name: name, more: getSubElements(element)});
              });
              break;
            case 'string':
            case 'number':
              output = exampleTemplate({example: node});
              break;
            default:
              new Error("Unknown type");
          }
        }
        return js_beautify(output);
      };

      var service = {
        init: function(){
          var deferred = $q.defer();
          $http.get('views/converter_templates/describe.tmplt').then(function (result) {
            definitionTemplate = _.template(result.data);
            $http.get('views/converter_templates/it.tmplt').then(function (result) {
              exampleTemplate = _.template(result.data);
              deferred.resolve(service);
            });
          });

          return deferred.promise;
        },
        convert: function (spec) {
          var deferred = $q.defer();
          try {
            var output = jsyaml.load(spec);
            if (output) {
              deferred.resolve(translate(output));
            } else {
              deferred.resolve(output);
            }
          }
          catch (e) {
            deferred.reject(e.message);
          }
          return deferred.promise;
        }
      };

      return service;
    });