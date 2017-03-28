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
      let nameli = [];
      let skuli = [];
      let itemli = [];
      let phoneli = [];
      let orders = [];
        for(let x = 1; x < enter.length+1; x++) {
          orders.push("Order " + x);
        }
      let enterList = enter.forEach((obj) => {
        nameli.push(JSON.stringify(obj.name));
        skuli.push(JSON.stringify(obj.sku));
        itemli.push(JSON.stringify(obj.item));
        phoneli.push(JSON.stringify(obj.phone));
      })
      nameli = nameli.map((x) => {
        x = x.replace(/"/g,"");
        return x
      })
      itemli = itemli.map((x) => {
        x = x.replace(/"/g,"");
        return x
      })
    res.render("list", { names: nameli, sku: skuli, item: itemli, name: postName, phone: phoneli, order: orders});
    }
})
});

module.exports = router;
