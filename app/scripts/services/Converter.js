'use strict';

angular.module('spectatorApp')
    .service('Converter', function Converter($injector, $q) {
      return {
        fetch: function(name){
          return $injector.get(name + 'Converter').init();
        }
      }
    });
