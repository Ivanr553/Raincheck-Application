const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Enter = require("../models/enterModel");
const helper = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {

  Enter.find({}, (err, enter) => {
    if (err) {res.send(err)};
    if(!enter) {
      res.render("index");
    }
    if(enter && enter.length === 0) {
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
            order.push(JSON.stringify(obj.notes).replace(/"/g, ""));
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


router.post("/enter", (req, res) => {
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
    if(req.body.notes === "") {
      req.body.notes = " ";
    }
  let newEnter = new Enter({
    name: req.body.name,
    skus: req.body.skus,
    items: req.body.items,
    phone: req.body.phone,
    notes: req.body.notes
  });

  newEnter.save(newEnter, (err) => {
    if (err) throw err;
    res.redirect("..");
  })
}});


/* For searching for rainchecks, will consider adding this in later
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

*/
router.post("/delete", (req, res) => {
  const postPhone = req.body.phone;

  Enter.findOneAndRemove({phone: postPhone}, (err, enter) => {
    if(err) throw err;
    if(!enter) res.send(postPhone + " not found");
    if(enter.length > 1) {
      res.send(enter);
    }
    else {
      res.redirect("..")
    }
  })
});

router.post("/update", (req, res) => {
  const postNotes = req.body.notes;
  const postPhone = req.body.phone*1;

  Enter.findOne({phone: postPhone}, (err, enter) => {
    if(err) throw err;
    enter.notes = postNotes;
    console.log(enter);
    enter.save((err, updatedEnter) => {
      if(err) throw err;
      res.redirect("..");
    })
  })
});


router.get("/apiData", (req, res) => {
  Enter.find((err, enter) => {
    if(err) throw err;
    res.send(JSON.stringify(enter));
  })
})


router.get("/v3/mail/send", (req, res) => {

let from_email = new helper.Email("test@example.com");
let to_email = new helper.Email("ivanr553@gmail.com");
let subject = "Sending with SendGrid is Fun";
let content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
let mail = new helper.Mail(from_email, subject, to_email, content);

let request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
})

})


module.exports = router;
