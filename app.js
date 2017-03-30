const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connection;
const config = require("./config/database");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const exphbs  = require('express-handlebars');

const index = require('./routes/index');

//connect to database
mongoose.connect(config.database);

//check for err
db.on("error", (err) => {
  if(err) {
    console.log(err);
  };
})

//log connection status
db.once("open", () => {
  console.log("Connected to db: " + config.database);
})

//engines
//app.engine("hbs", engines.handlebars);
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: "layout", layoutsDir: "./public/layouts"}));

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'hbs');

//static directory
app.use("/", index);

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
