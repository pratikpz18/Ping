const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/user");
const initiatemongoserver = require("./config/db");
const session = require("express-session");

initiatemongoserver();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'Secreyyyy',
  resave: true,
  saveUninitialized: true
}))

// app.get("/", (req, res) => {
//   res.json({ message: "API Working" });
// });

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

app.use(cors());
app.use("/users/", user);