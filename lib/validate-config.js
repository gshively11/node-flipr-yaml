'use strict';

var async = require('async');
var _ = require('lodash');
var getConfig = require('./get-config/get-config');
var fliprValidation = require('flipr-validation');

module.exports = validateConfig;

function validateConfig(options, cb) {
  var validateOptions = {
    rules: options.rules,
  };

  async.auto({
    config: _.partial(getConfig.ignoreCache, options),
    validate: ['config', function(callback, results){
      validateOptions.config = results.config;
      callback(null, fliprValidation(validateOptions));
    }]
  }, function(err, results){
    if(err)
      return void cb(err);
    return void cb(null, results.validate);
  });
}