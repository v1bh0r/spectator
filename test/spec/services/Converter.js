'use strict';

describe('Service: Converter', function () {
  var MOCK_CONVERTER_NAME = "TEST";
  var MOCK_CONVERTER = {init: function () {
    return true;
  }};

  // load the service's module
  beforeEach(module('spectatorApp', function ($provide) {
    $provide.value(MOCK_CONVERTER_NAME + "Converter", MOCK_CONVERTER);
  }));

  // instantiate service
  var Converter;


  beforeEach(inject(function (_Converter_) {
    Converter = _Converter_;
  }));

  it('should do something', function () {
    expect(!!Converter).toBe(true);
  });

  it('returns adapter based on name', function () {
    var converter = Converter.fetch(MOCK_CONVERTER_NAME);
    expect(!!converter).toBe(true);
  });

  it('raises exception when converter not found', function () {
    expect(function () {
      Converter.fetch("SOME_RANDOM_NAME");
    }).toThrow(new Error("[$injector:unpr] Unknown provider: SOME_RANDOM_NAMEConverterProvider <- SOME_RANDOM_NAMEConverter"));
  });
});
