'use strict';

var async = require('async');
var _ = require('lodash');
var validateConfig = require('flipr-validation');
var getConfig = require('./get-config');

module.exports = fliprYaml;

function fliprYaml(options) {
  return {
    getConfig: _.partial(getConfig, options),
    //preloading flipr-yaml requires grabbing the
    //config once.  we just re-expose getConfig as
    //preload to match the flipr source interface
    preload: _.partial(getConfig, options),
    flush: getConfig.flush,
    validateConfig: function(cb) {
      async.waterfall([
        _.partial(getConfig, options),
        validateConfig
      ], cb);
    }
  };
}