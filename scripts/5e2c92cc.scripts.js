"use strict";angular.module("spectatorApp",["ngRoute","ui.ace"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("spectatorApp").controller("MainCtrl",["$scope","Converter",function(a,b){var c=null;a.yaml={content:"Service - Contact:\n    - has a name\n    - has an address:\n        - has pin code\n        - has street number",error:null},a.testScript={content:null,error:null},a.$watch("yaml.content",function(){null===c&&(c=b.fetch("SpecToJasmine"));try{var d=c.convert(a.yaml.content);a.testScript.content=d?d:null,a.yaml.error=null}catch(e){a.yaml.content&&(a.yaml.error=e.message)}})}]),angular.module("spectatorApp").service("Converter",["$injector",function(a){return{fetch:function(b){return console.log(b),a.get(b+"Converter")}}}]),angular.module("spectatorApp").service("SpecToJasmineConverter",function(){var a=_.template("describe('<%= name %>', function () {\n<%= more %>\n});"),b=_.template("it('<%= example %>', function () {\n    expect(false).toBe(true);\n    });"),c=function(a){var b=d(a);return b="    "+b.replace(/\n/,"\n    ")+"\n"},d=function(d){var e="";if(d instanceof Array)angular.forEach(d,function(a){e+=c(a)});else switch(typeof d){case"object":angular.forEach(d,function(b,d){e+=a({name:d,more:c(b)})});break;case"string":case"number":e=b({example:d});break;default:new Error("Unknown type")}return e},e={convert:function(a){var b=jsyaml.load(a);return b?d(b):null}};return e});