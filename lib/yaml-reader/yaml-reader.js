'use strict';

var _ = require('lodash');
var readByFileName = require('./read-by-file-name');
var readByEnvironment = require('./read-by-environment');

module.exports = yamlReader;

function yamlReader(options, cb) {
  options = _.defaults({}, options, {
    folderPath: 'lib/config',
    envLocalFileName: 'local.yaml',
    envFileNameFormat: '%s.yaml',
    envFileNameMap: {
      dev: 'dev',
      development: 'development',
      test: 'test',
      staging: 'staging',
      master: 'prod',
      prod: 'prod',
      prodution: 'production'
    },
    envVariable: 'NODE_ENV'
  });

  if(_.isFunction(options.fileName))
    options.fileName = options.fileName();

  if(_.isString(options.fileName))
    return void readByFileName(options, cb);
  return void readByEnvironment(options, cb);
}