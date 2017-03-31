const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let enterSchema = mongoose.Schema({
  name: String,
  skus: [Number],
  items: [String],
  phone: Number,
  notes: String
});

let Enter = module.exports = mongoose.model("Enter", enterSchema);
