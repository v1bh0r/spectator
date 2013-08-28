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

  xit('converts spec in yaml to jasmine', function(){
    var input = "This service\n    - should do something";
    var output = "describe('This service', function() {\n    it('should do something', function () {\n        \n})    \n})";
    expect(SpecToJasmineConverter.convert(input)).toBe(output);
  })
});
