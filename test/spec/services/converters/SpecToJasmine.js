'use strict';

describe('Service: SpecToJasmineConverter', function () {

  // load the service's module
  beforeEach(module('spectatorApp'));

  // instantiate service
  var SpecToJasmineConverter;
  beforeEach(inject(function (_SpecToJasmineConverter_) {
    SpecToJasmineConverter = _SpecToJasmineConverter_;
  }));

  it('should do something', function () {
    expect(!!SpecToJasmineConverter).toBe(true);
  });

  it('converts spec in yaml to jasmine',  inject(function($rootScope, $q) {
    var input = "This service\n    - should do something";
    var output = "describe\n    it";
    var dataToValidate = null;

    var deferredInit = $q.defer();
    spyOn(SpecToJasmineConverter, 'init').andReturn(deferredInit.promise);

    var deferredConvert  = $q.defer();
    spyOn(SpecToJasmineConverter, 'convert').andReturn(deferredConvert.promise);

    var initDeferred = SpecToJasmineConverter.init();
    initDeferred.then(function (converter) {
      converter.convert(input).then(function (response) {
        dataToValidate = response;
      });
    });

    deferredInit.resolve(SpecToJasmineConverter);
    deferredConvert.resolve(output);
    $rootScope.$apply();

    expect(dataToValidate).toBe(output);
  }));
});
