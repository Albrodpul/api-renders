"use strict";

module.exports = {
  getGroups: getGroups,
  getGroup: getGroup,
  insertGroup: insertGroup,
  deleteGroup: deleteGroup
};

const assert = require("assert");
var mongoose = require("mongoose");

var modelsMongo = require("../utils/models");
var config = require("../config/config");

var logger = require("../config/logConfig");

var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
mongoose.Promise = global.Promise;

var promise = mongoose.connect(uri);

function getGroups(callback) {
  modelsMongo.find({
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      callback(null, data); //get groups
    }
  });
}

function getGroup(groupName, year, callback) {
  modelsMongo.find({
    "groupName": groupName,
    "year": year
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

function insertGroup(newData, callback) {
  var groupName = newData[0].groupName;
  var year = newData[0].year;
  modelsMongo.find({
    "groupName": groupName,
    "year": year
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

function deleteGroup(groupName, year, callback) {
  modelsMongo.find({
    "groupName": groupName,
    "year": year
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length == 0) {
      callback(null, null); //not found
    } else {
      modelsMongo.remove({
        "groupName": groupName,
        "year": year
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


