'use strict';

const request = require("request");
const Promise = require("bluebird");

const mongo = require("../utils/mongo");
const config = require("../config/config");
const logger = require("../config/logConfig");

exports.getRenders = function (args, res, next) {
  /**
   * Returns all renders
   *
   * returns List
   **/
  var id = args.id.value;
  var type = args.type.value;
  if (!id && !type) {
    logger.info("Get Renders");
    mongo.getRenders(function (err, data) {
      if (err) {
        logger.info(err);
        res.sendStatus(500); // internal server error
      } else {
        logger.info("Get!");
        res.send(data);
      }
    });
  } else if (id && !type) {
    mongo.getRenderById(id, function (err, data) {
      if (err) {
        logger.info(err);
        res.sendStatus(500); // internal server error
      } else if (data) {
        logger.info("Get render!");
        res.send(data);
      } else {
        logger.info("Not found");
        res.sendStatus(404);
      }
    });
  } else if (!id && type) {
    mongo.getRenderByType(type, function (err, data) {
      if (err) {
        logger.info(err);
        res.sendStatus(500); // internal server error
      } else if (data) {
        logger.info("Get render!");
        res.send(data);
      } else {
        logger.info("Not found");
        res.sendStatus(404);
      }
    });
  } else if (id && type) {
    logger.info("Bad request");
    res.sendStatus(400); // bad request
  }
}

exports.insertRender = function (args, res, next) {
  /**
   * Insert a new render
   *
   * render List The render JSON you want to post
   * no response value expected for this operation
   **/
  var render = args.render.value;
  logger.info("Inserting document");
  if (!render[0]) {
    logger.info("Bad Request");
    res.sendStatus(400); // bad request    
  } else {
    if (render[0].id && render[0].sampleModel && render[0].view && render[0].ctrl && render[0].type && Object.keys(render[0]).length == 5) {
      mongo.insertRender(render, function (err, data) {
        if (err) {
          logger.info(err);
          res.sendStatus(500); // internal server error
        } else if (data) {
          logger.info("409 Conflict");
          res.sendStatus(409); //conflict
        } else {
          logger.info("Saved!");
          res.sendStatus(201); // created
          res.end();
        }
      });
    } else {
      logger.info("Unprocessable entity");
      res.sendStatus(422); // unprocessable entity
    }
  }
}

exports.deleteRender = function (args, res, next) {
  /**
   * Delete an existing render
   *
   * Id of an existing render
   * no response value expected for this operation
   **/
  var id = args.id.value;
  logger.info("Deleting " + id);
  if (!id) {
    logger.info("Bad Request");
    res.sendStatus(400).end();
  } else {
    mongo.deleteRender(id, function (err, result) {
      if (err) {
        logger.info(err);
        res.sendStatus(500).end(); // internal server error
      } else if (result) {
        logger.info("Deleted!");
        res.sendStatus(204).end(); // no content
      } else {
        logger.info("Not found");
        res.sendStatus(404).end(); // not found
      }
    });
  }
};