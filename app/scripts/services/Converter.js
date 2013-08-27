'use strict';

angular.module('spectatorApp')
    .service('Converter', function Converter() {
      var converters = {};
      return {
        register: function (name, converter) {
          converters[name] = converter;
        },
        fetch: function(name){
          var found = converters[name];
          if(found){
            return found;
          }else{
            throw new Error("Converter not found");
          }
        }
      }
    });
