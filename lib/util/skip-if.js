'use strict';

module.exports = skipIf;

function skipIf(condition, func) {
  return function(value, cb) {
    if(condition(value))
      return cb();
    return func(value, cb);
  };
}