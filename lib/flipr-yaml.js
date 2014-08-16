'use strict';

var _ = require('lodash');
var getConfig = require('./get-config/get-config');
var validateConfig = require('./validate-config');

module.exports = fliprYaml;

function fliprYaml(options) {
  return {
    getConfig: _.partial(getConfig, options),
    //preloading flipr-yaml requires grabbing the
    //config once.  we just re-expose getConfig as
    //preload to match the flipr source interface
    preload: _.partial(getConfig, options),
    flush: getConfig.flush,
    validateConfig: _.partial(validateConfig, options)
  };
}