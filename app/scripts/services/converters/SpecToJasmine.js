'use strict';

angular.module('spectatorApp')
    .service('SpecToJasmineConverter', function SpecToJasmineConverter() {
      var definitionTemplate = _.template("describe('<%= name %>', function () {\n<%= more %>\n});");
      var exampleTemplate = _.template("it('<%= example %>', function () {\n    expect(false).toBe(true);\n    });");

      var getSubElements = function (element) {
        var subElements = translate(element);
        subElements = "    " + subElements.replace(/\n/, '\n    ') + "\n";
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
        return output;
      };

      var service = {
        convert: function (spec) {
          var output = jsyaml.load(spec);
          if (output) {
            return translate(output);
          } else {
            return null;
          }
        }
      };

      return service;
    });