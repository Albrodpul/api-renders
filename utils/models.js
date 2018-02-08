"use strict";
var mongoose = require("mongoose");
var config = require("../config/config");
var uri = "mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp";
var promise = mongoose.connect(uri);
// mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var RenderSchema = new Schema({
  id: String,
  sampleModel: String,
  view: String,
  ctrl: String,
  type: String
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users

// the schema is useless so far
// we need to create a model using it
var Render = mongoose.model("renders", RenderSchema);

// make this available to our users in our Node applications
module.exports = Render;
