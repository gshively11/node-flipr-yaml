'use strict';

var readFile = require('./read-file');

module.exports = readFileWithoutError;

function readFileWithoutError(filePath, cb) {
  readFile(filePath, function(err, data){
    if(err)
      return void cb();
    cb(null, data);
  });
}