'use strict';

angular.module('spectatorApp')
    .service('Converter', function Converter($injector) {
      return {
        fetch: function(name){
          console.log(name);
          return $injector.get(name + 'Converter');
        }
      }
    });
