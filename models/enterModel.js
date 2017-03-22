const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let enterSchema = mongoose.Schema({
  name: String,
  sku: Number,
  item: String,
  phone: Number
});

let Enter = module.exports = mongoose.model("Enter", enterSchema);
