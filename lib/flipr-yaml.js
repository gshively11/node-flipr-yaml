'use strict';

var _ = require('lodash');
var memoize = require('memoizee');
var yamlReader = require('./yaml-reader/yaml-reader');
var validateConfig = require('./validate-config');

module.exports = FliprYaml;

function FliprYaml(options) {
  //Force instantiation
  if(!(this instanceof FliprYaml))
    return new FliprYaml(options);

  this.getConfig = memoize(_.partial(yamlReader, options), {async:true});

  //Calling getConfig will memoize the cache.
  this.preload = this.getConfig;

  this.flush = _.bind(function(){
    this.getConfig.clear();
  }, this);

  this.validateConfig = _.partial(validateConfig, options);
}