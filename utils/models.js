"use strict";
var mongoose = require("mongoose");
var config = require("../config/config");
var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
var promise = mongoose.connect(uri);
// mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema
/*var GroupSchema = new Schema({
  groupName: {
    type: Object,
    items: {
      name: String,
      orcid: String,
      authodId: String
    }
  } 
});*/

var RenderSchema = new Schema({
  id: String,
  model: String,
  view: String,
  ctrl: String,
  type: String
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users

// the schema is useless so far
// we need to create a model using it
var Group = mongoose.model("groups", RenderSchema);

// make this available to our users in our Node applications
module.exports = Group;
