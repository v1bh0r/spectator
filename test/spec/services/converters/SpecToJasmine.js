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

  it('converts spec in yaml to jasmine', function(){
    expect(SpecToJasmineConverter.convert("asdfasdfasd").length).toBeGreaterThan(0);
  })
});
