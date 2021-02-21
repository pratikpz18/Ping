const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/user");
const initiatemongoserver = require("./config/db");

initiatemongoserver();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});
app.use(cors());

const server = app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

const io = require("socket.io").listen(server);

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use("/users", user);