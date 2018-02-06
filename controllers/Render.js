'use strict';

var url = require('url');

var Render = require('./RenderService');

module.exports.getRenders = function getRenders (req, res, next) {
  Render.getRenders(req.swagger.params, res, next);
};

module.exports.getRender = function getRender (req, res, next) {
  Render.getRender(req.swagger.params, res, next);
};

module.exports.insertRender = function insertRender (req, res, next) {
  Render.insertRender(req.swagger.params, res, next);
};

module.exports.deleteRender = function deleteRender (req, res, next) {
  Render.deleteRender(req.swagger.params, res, next);
};