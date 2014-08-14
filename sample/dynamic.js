'use strict';

var fliprYaml = require('../lib/flipr-yaml');

var source = fliprYaml({
  folderPath: 'sample/config/',
  fileName: 'feature-flipping.yaml'
});

source.getConfig(function(err, config){
  console.dir(config);
});