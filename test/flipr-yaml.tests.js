'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var sutPath = '../lib/flipr-yaml';
chai.use(sinonChai);

var lodashMock;
var getConfigMock;
var validateConfigMock;
var sutProxy;

describe('flipr', function(){
  beforeEach(function(){
    lodashMock = mockLodash();
    getConfigMock = {flush:'flush'};
    validateConfigMock = 'validateConfig';
    sutProxy = proxyquire(sutPath, {
      'lodash': lodashMock,
      './get-config/get-config': getConfigMock,
      './validate-config': validateConfigMock
    });
  });
  it('returns an object with the correct interface', function(){
    var result = sutProxy('options');
    expect(result.getConfig).to.equal(getConfigMock);
    expect(result.preload).to.equal(getConfigMock);
    expect(result.flush).to.equal(getConfigMock.flush);
    expect(result.validateConfig).to.equal(validateConfigMock);
    expect(lodashMock.partial).to.have.been.calledWith(getConfigMock, 'options');
    expect(lodashMock.partial).to.have.been.calledWith(validateConfigMock, 'options');
  });
});

function mockLodash(){
  return {
    partial: sinon.spy(function(func){ return func; })
  };
}