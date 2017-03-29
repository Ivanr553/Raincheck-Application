const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Enter = require("../models/enterModel")
const path = require("path");
//const index = require("../public/index");

router.post("/", (req, res) => {
  function checkEmpty(skus, items) {
    for(let i = 0; i < skus.length; i++) {
      if(skus[i] === "" || skus[i] === undefined || skus[i] === null) {
        return false;
      }
    }
    for(let i = 0; i < items.length; i++) {
      if(items[i] === "" || items[i] === undefined || items[i] === null) {
        return false;
      }
    }
    return true;
  }
  if(!checkEmpty(req.body.skus, req.body.items)) {
    res.send("Fill in all fields");
  }
  else {
  let newEnter = new Enter({
    name: req.body.name,
    skus: req.body.skus,
    items: req.body.items,
    phone: req.body.phone
  });

  newEnter.save(newEnter, (err) => {
    if (err) throw err;
    res.send("Entered in user: " + newEnter);
  })
}});

module.exports = router;
