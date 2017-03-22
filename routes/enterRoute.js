const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Enter = require("../models/enterModel")
const path = require("path");
//const index = require("../public/index");

router.post("/", (req, res) => {
  let newEnter = new Enter({
    name: req.body.name,
    sku: req.body.sku,
    item: req.body.item,
    phone: req.body.phone
  });

  newEnter.save(newEnter, (err) => {
    if (err) throw err;
    res.redirect("../");
  })
});

router.post("/find", (req,res) => {
  const postName = req.body.name;

  Enter.find({name: postName}, (err, enter) => {
    if (err) {res.send(err)};
    if(enter.length === 0) {
      res.send("Found none");
    }
    else {
      let injection = enter.map((obj) => {
        return obj = obj.name;
      })
    res.json(enter);
    }
})
});

module.exports = router;
