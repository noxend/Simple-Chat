const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");
const port = 1285;
const app = express();
const server = app.listen(port, () => {
  console.log(`Listeningh ${port} port`);
});

mongoose
  .connect("mongodb://localhost:27017/newChat")
  .then(() => {
    console.log("mongo working");
  })
  .catch(e => {
    console.log(e);
  });

mongoose.Promise = require("bluebird");

const MessageModel = require("./models/message.model");

var clientsID = [];
var users = {};

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const io = socket(server);

io.on("connection", socket => {
  //idList[socket.id] = socket.id;
  io.clients((error, clients) => {
    if (error) throw error;
    clientsID = clients;
  });

  socket.on('receiveHistory', () => {
    MessageModel.find({})
    .sort({date: -1})
    .limit(50)
    .sort({date: 1})
    .lean()
    .exec((err, message) => {
      if(!err){
        socket.emit("history", message);
      }
    })
  });
  // socket.on('newName', data => {
  //   socket.nickname = data;
  //   users[socket.nickname] = socket;
  //   updateUsers();
  // });

  socket.on("new user", (data, obj, cb) => {
    if (data in users) {
      cb(false);
    } else {
      cb(true);
      socket.infoUser = obj;
      socket.nickname = data;
      users[socket.nickname] = socket;
      updateUsers();
    }
  });

  socket.on("chat", data => {
    socket.contant = data;
    if (data.imgLink === "") {
      data.imgLink =
        "https://www.caroutletgroningen.nl/wp-content/uploads/2018/02/user-admin.png";
    }
    if (data.message !== "") {
      if (data.name !== "") {
        var objDate = {
          data: data,
          nick: socket.nickname,
          date: new Date()
        };
        MessageModel.create(objDate , err => {
          if (err) return console.error("MessageModel", err);
          io.sockets.emit("chat", objDate);
        // socket.to("main").emit("chat", objDate);
        });
      }
    }
    if (data.message === "/exit") {
      socket.disconnect();
    }
  });

  socket.emit("id", {
    id: socket.id
  });

  socket.emit("notification", {
    welcome: "Welcome to our chat! 😄",
    errorNickname: "Please choose a nickname!"
  });

  socket.on("disconnect", reason => {
    if (!socket.nickname) return;
    delete users[socket.nickname];
    updateUsers();

    clientsID.forEach((id, i, clientsID) => {
      if (clientsID[i] === socket.id) {
        io.sockets.emit("leave", socket.nickname);
        delete clientsID[i];
      }
    });

    // if(idList[socket.id]){

    //     io.sockets.emit('leave', {
    //         id: socket.id
    //     });
    //     delete idList[socket.id];
    // }
  });

  function updateUsers() {
    io.sockets.emit("usernames", Object.keys(users), socket.infoUser);
  }
});
