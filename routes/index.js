const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Enter = require("../models/enterModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/find", (req,res) => {
  const postName = req.body.name;

  Enter.find({name: postName}, (err, enter) => {
    if (err) {res.send(err)};
    if(enter.length === 0) {
      res.send("Found none");
    }
    else {
      const injection = enter.map((obj) => {
        return obj = obj.name;
      })
    res.render("list", { list: injection});
    }
})
});

module.exports = router;
