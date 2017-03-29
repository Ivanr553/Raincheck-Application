const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Enter = require("../models/enterModel");

/* GET home page. */
router.get('/', function(req, res, next) {

  Enter.find({}, (err, enter) => {
    if (err) {res.send(err)};
    if(!enter) {
      res.render("index");
    }
    if(enter.length === 0) {
      res.render("index");
    }
    else {
      let orders = [];
      let items = [];
      let enterList = enter.forEach((obj) => {
        let order = [];
        let item = [];
        order.push((enter.indexOf(obj)+ 1)+ ".")
        order.push(JSON.stringify(obj.name).replace(/"/g, ""));
        order.push(JSON.stringify(obj.phone));
        for(let j = 0; j < obj.skus.length; j++) {
          if(j === 0) {
            order.push(JSON.stringify(obj.skus[j]));
            order.push(JSON.stringify(obj.items[j]).replace(/"/g, ""));
            orders.push(order);
          }
          else {
            order = [];
            order.push("");
            order.push("");
            order.push("");
            order.push(JSON.stringify(obj.skus[j]));
            order.push(JSON.stringify(obj.items[j]).replace(/"/g, ""));
            orders.push(order);
          }
        }
      });
    res.render("index", {orders: orders});
    }
})
});

router.post("/find", (req,res) => {
  const postName = req.body.name;

  Enter.find({name: postName}, (err, enter) => {
    if (err) {res.send(err)};
    if(!enter) {
      res.send("Found none");
    }
    if(enter.length === 0) {
      res.send("Found none");
    }
    else {
      let orders = [];
      let items = [];
      let enterList = enter.forEach((obj) => {
        let order = [];
        let item = [];
        order.push("Order " + (enter.indexOf(obj)+ 1))
        order.push(JSON.stringify(obj.name).replace(/"/g, ""));
        order.push(JSON.stringify(obj.phone));
        for(let j = 0; j < obj.skus.length; j++) {
          if(j === 0) {
            order.push(JSON.stringify(obj.skus[j]));
            order.push(JSON.stringify(obj.items[j]).replace(/"/g, ""));
            orders.push(order);
          }
          else {
            order = [];
            order.push("");
            order.push("");
            order.push("");
            order.push(JSON.stringify(obj.skus[j]));
            order.push(JSON.stringify(obj.items[j]).replace(/"/g, ""));
            orders.push(order);
          }
        }
      });
    res.render("list", {orders: orders, name: postName});
    }
})
});

router.post("/delete", (req, res) => {
  const postName = req.body.name;
  /*Enter.find({name: postName}, (err, enter) => {
    if (err) {res.send(err)};
    if(enter.length === 0) {
      res.send("Found none");
    }
    else {
      res.send(enter)
    }
  });*/

  Enter.findOneAndRemove({name: postName}, (err, enter) => {
    if(err) throw err;
    if(!enter) res.send(postName + " not found");
    if(enter.length > 1) {
      res.send(enter);
    }
    else {
      console.log(enter.postName)
      res.send("deleted: " + enter.name)
    }
  })
});

module.exports = router;
