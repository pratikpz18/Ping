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

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
  console.log('connection established',socket.id);
  // io.emit('New Connection')
  socket.on('send', (data)=>{
    console.log("Receive data from single username",data)
    socket.join(`${data.username}`) //IF I COMMENT THIS USERNAME IS TOGGLING BUT MSG OF PREVIOUS USER IS STILL THERE
    // io.emit(`${data.username}`, data)..
    // io.emit('send',data)..
    // socket.broadcast.to(`${data.username}`).emit(`${data.username}`,data)..
    // socket.to(`${data.username}`).emit('message',data.message);..
    io.emit('sended',data)
    socket.to(`${data.username}`).emit(`${data.username}`,data)
    // socket.join(data.username);
    // io.sockets.in(data.username).emit('new_msg', data);
  });
  // socket.on("online", data => {
  //   socket.name = data.username;
  //   onlineUsers.push(data);
  //   sockets[data.username] = socket.id;
  // });
  // socket.on("message", function(data) {
  //   socket.broadcast.emit("public", data);
  // });
  
  socket.on('disconnect',()=>{
    console.log("disconnect")
  })
});

app.use("/users", user);