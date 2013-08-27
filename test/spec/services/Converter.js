'use strict';

describe('Service: Converter', function () {

  // load the service's module
  beforeEach(module('spectatorApp'));

  // instantiate service
  var Converter;
  var MOCK_CONVERTER_NAME = "TEST-CONVERTER";
  var MOCK_CONVERTER = {};

  beforeEach(inject(function (_Converter_) {
    Converter = _Converter_;
    Converter.register(MOCK_CONVERTER_NAME, MOCK_CONVERTER);
  }));

  it('should do something', function () {
    expect(!!Converter).toBe(true);
  });

  it('returns adapter based on name', function () {
    var converter = Converter.fetch(MOCK_CONVERTER_NAME);
    expect(!!converter).toBe(true);
  });

  it('raises exception when converter not found', function(){
    expect( function(){
      Converter.fetch("SOME_RANDON_NAME");
    }).toThrow(new Error("Converter not found"));
  });
});
