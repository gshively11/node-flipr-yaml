'use strict';

var fliprYaml = require('../lib/flipr-yaml');

var source = fliprYaml({
  folderPath: 'sample/config/',
  fileName: 'basic.yaml'
});

source.getConfig(function(err, config){
  if(err)
    return void console.dir(err);
  console.dir(config);
});