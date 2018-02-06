"use strict";

module.exports = {
  getRenders: getRenders,
  getRender: getRender,
  insertRender: insertRender,
  deleteRender: deleteRender
};

const assert = require("assert");
var mongoose = require("mongoose");

var modelsMongo = require("../utils/models");
var config = require("../config/config");

var logger = require("../config/logConfig");

var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/tfg1718-arp";
mongoose.Promise = global.Promise;

var promise = mongoose.connect(uri);

function getRenders(callback) {
  modelsMongo.find({}, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      callback(null, data); //get groups
    }
  });
}

function getRender(id, callback) {
  modelsMongo.find({
    "id": id
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      if (data.length > 0) {
        callback(null, data); //get group
      } else {
        callback(null, null); //not found
      }
    }
  });
}

function insertRender(newData, callback) {
  var id = newData[0].id;
  modelsMongo.find({
    "id": id
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      if (data.length > 0) {
        callback(null, data); //conflict
      } else {
        modelsMongo.collection.insert(newData, {
          ordered: true
        }, function (err) {
          if (err) {
            callback(err, null); //internal server error
          } else {
            callback(null, null); //created
          }
        });
      }
    }
  })
}

function deleteRender(id, callback) {
  modelsMongo.find({
    "id": id
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length == 0) {
      callback(null, null); //not found
    } else {
      modelsMongo.remove({
        "id": id
      }, function (err, result) {
        if (err) {
          callback(err, null); //internal server error
        } else {
          callback(null, result); //deleted
        }
      });
    }
  });
}