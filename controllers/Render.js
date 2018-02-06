'use strict';

var url = require('url');

var Render = require('./RenderService');

module.exports.get = function get (req, res, next) {
  Render.get(req.swagger.params, res, next);
};
