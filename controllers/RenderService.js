'use strict';

exports.get = function(args, res, next) {
  /**
   * Returns all renders
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "view" : "aeiou",
  "ctrl" : "aeiou",
  "model" : "aeiou",
  "id" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

