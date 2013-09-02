'use strict';

describe('Service: SpecToJasmineConverter', function () {

  // load the service's module
  beforeEach(module('spectatorApp'));

  // instantiate service
  var SpecToJasmineConverter, httpBackend;
  beforeEach(inject(function (_SpecToJasmineConverter_, _$httpBackend_) {
    SpecToJasmineConverter = _SpecToJasmineConverter_;
    httpBackend = _$httpBackend_;
  }));

  it('should do something', function () {
    expect(!!SpecToJasmineConverter).toBe(true);
  });

  it('converts spec in yaml to jasmine', function(){
    httpBackend.whenGET('views/converter_templates/describe.tmplt').respond('describe');
    httpBackend.whenGET('views/converter_templates/it.tmplt').respond('it');
    var input = "This service\n    - should do something";
    var output = "describe\n    it";
    var dataToValidate = null;
    SpecToJasmineConverter.convert(input).then(function(response){
      dataToValidate = response;
    });
    expect(dataToValidate).toBe(output);
  })
});
