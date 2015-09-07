'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  info: String,
  category: String,
  price: Number,
  active: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
