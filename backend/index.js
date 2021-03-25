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
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});

app.use(cors());

const server = app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
  // console.log('connection established',socket.id);
  socket.on('send', (data)=>{
    console.log("Receive data from single username",data)
    console.log('connection established',socket.id);
    console.log(data.username)
    socket.join(data.senderusername)
  });
  socket.on('sended',data=>{
      console.log("gtf")
      // io.to(data.senderusername).emit('sended',data)
      io.emit('sended',data)
  })
  
  socket.on('disconnect',()=>{
    console.log("disconnect")
  })
});

app.use("/users", user);