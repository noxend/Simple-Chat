// import React from 'react'
// import {render} from 'react-dom'

var buttonSend = document.getElementById("buttonSend"),
  nickName = document.getElementById("nickName"),
  textArea = document.getElementById("textArea"),
  block_messageID = document.getElementById("block_messageID"),
  stat = document.getElementById("status"),
  form = document.getElementById("form"),
  userActive = document.getElementsByClassName("user"),
  bodyPage = document.getElementById("body"),
  modalWindow = document.getElementById("modalWindowId"),
  btnSettings = document.getElementById("settings"),
  titleNickname = document.getElementById("title"),
  btnCloseModal = document.getElementById("btnCloseModal"),
  msgBox = document.getElementById("msg__block"),
  imgLink = document.getElementById("imageLink"),
  users = document.getElementById("users"),
  //**** LOGIN PANEL ****
  submitNickname = document.getElementById("submitNickname"),
  loginPanel = document.getElementById("loginPanel"),
  submitValue = document.getElementById("submitValue"),
  submitOk = document.getElementById("submitOk"),
  //**** LOGIN PANEL ****

  settings = document.getElementById("settings");

// var socket = io.connect('https://chat-on-nodejs--noxios5674.repl.co/');
var socket = io.connect("http://localhost:1285");

var style = document.createElement("style");

document.getElementsByTagName("body")[0].appendChild(style);

var userId = "";
var connectStat = false;
//var nickname = '';

var images = [
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/8/81/BMO.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/2/window-width/159/window-height/141?cb=20161024201513",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/f/f3/Original_Finn.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/4/window-width/203/window-height/180?cb=20120921151658",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/7/window-width/382/window-height/338?cb=20160503014517",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/1/12/Flame_Queen.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/52/window-width/1600/window-height/1415?cb=20170519024127",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/b/ba/Creature_2.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/8/window-width/596/window-height/527?cb=20140817133132",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/6f/Huntress.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/28/window-width/927/window-height/820?cb=20120811131500",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/68/Gunter.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/3/window-width/152/window-height/134?cb=20121016040602",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/64/AT-Min%26M.16.png/revision/latest/window-crop/width/130/x-offset/250/y-offset/0/window-width/869/window-height/768?cb=20170206025823",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/64/Original_Ice_King.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/5/window-width/293/window-height/259?cb=20160405041324",
  "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/68/Gunter.png/revision/latest/window-crop/width/130/x-offset/0/y-offset/3/window-width/152/window-height/134?cb=20121016040602",
  "https://instagram.fiev1-1.fna.fbcdn.net/vp/d4ec520d36eee3898d079b5b7b22a624/5BB01A60/t51.2885-15/e35/35948750_231689904086484_7456416809038643200_n.jpg"
];
var colors = [
  "#232526",
  "#757F9A",
  "#5C258D",
  "#4389A2",
  "#134E5E",
  "#71B280",
  "#085078",
  "#FF8008",
  "#1D976C",
  "#EB3349",
  "#F45C43",
  "#DD5E89",
  "#1D2B64",
  "#FF512F",
  "#F09819",
  "#AA076B"
];

var rand = Math.floor(Math.random() * colors.length);
var randImg = Math.floor(Math.random() * images.length);
var randomColors = colors[rand];
var randomImages = images[randImg];

imgLink.value = randomImages;

submitNickname.addEventListener("submit", event => {
  event.preventDefault();

  var objDate = {
    color: randomColors,
    name: submitValue.value,
    img: imgLink.value
  };

  if (
    submitValue.value !== "" &&
    submitValue.value.length <= 15 &&
    submitValue.value.length >= 3
  ) {
    socket.emit("new user", submitValue.value, objDate, data => {
      console.log(data);
      if (data) {
        loginPanel.style.display = "none";
        document.getElementById("mainContainer").style.display = "flex";
        titleNickname.textContent = submitValue.value;
      } else {
        console.log("wtf bro");
      }
    });
  }
});

function notificationMsg(value) {
  var msg = document.createElement("div");
  msg.classList.add("message");
  block_messageID.appendChild(msg);
  msg.innerHTML = `<strong>${value.welcome}</strong>`;
}

function sendMsg(value) {
  var msg__block = document.createElement("div");
  msg__block.classList.add("msg__block");

  msg__block.id = "msg__block";
  var img = document.createElement("img");
  img.classList.add("img");
  img.id = "msg__img";
  var data = document.createElement("div");
  data.classList.add("data");
  data.id = "data";
  var span = document.createElement("span");
  span.classList.add("msg");
  span.id = "msg";
  var name = document.createElement("div");
  name.classList.add("user__name");
  name.id = "user__name";

  // msg.classList.add('message');
  block_messageID.appendChild(msg__block);
  msg__block.appendChild(img);
  msg__block.appendChild(data);
  data.appendChild(name);
  data.appendChild(span);

  name.setAttribute(`style`, `color:${value.data.colorName}`);
  img.setAttribute("src", `${value.data.imgLink}`);

  span.textContent = value.data.message;

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(
      document.createTextNode(
        `.msg__block:hover .img  {border: 4px ${value.data.colorName} solid;}`
      )
    );
  }

  if (submitValue.value === value.nick || nickName.value === value.nick) {
    msg__block.classList.add("my");
    msg__block.style.borderRight = `5px solid ${value.data.colorName}`;
    name.textContent = `Me`;
  } else {
    name.textContent = `${value.nick}`;
  }

  block_messageID.scrollTop = block_messageID.scrollHeight;
}

// function joinUser(value) {

//     var msg = document.createElement('div');
//     msg.classList.add('message');
//     block_messageID.appendChild(msg);
//     msg.innerHTML = `<strong style="color:#a2a2a2">${value.join}</strong> joined`;
// }

function errorNickname(value) {
  var msg = document.createElement("div");
  msg.classList.add("message");
  block_messageID.appendChild(msg);
  msg.innerHTML = `<strong style="color: #f44336">${
    value.errorNickname
  }</strong>`;
}

function connectedUsers(user) {
  var user = document.createElement("div");
  user.classList.add("user");
  users.appendChild(user);
  user.textContent = user;
}

function leave(value) {
  var msg = document.createElement("div");
  msg.classList.add("message");
  block_messageID.appendChild(msg);
  msg.innerHTML = `<div style="color: #a2a2a2; font-style: italic;"><strong>${value}</strong> left</div>`;
}

function newConect(value) {
  var msg = document.createElement("div");
  msg.classList.add("message");
  block_messageID.appendChild(msg);
  msg.innerHTML = `<div style="color: #a2a2a2; font-style: italic;"><strong>${
    value.nickname
  }</strong> join</div>`;
}

btnCloseModal.addEventListener("click", function() {
  modalWindow.style.display = "none";

  // socket.emit('newName', nickName.value);
  // titleNickname.textContent = nickName.value;

  // if(nickName.value === '') {
  //     titleNickname.innerHTML = '<strong style="color: #f44336">Please choose a nickname!</strong>'
  // }
});

document.addEventListener("keydown", e => {
  if (e.keyCode === 27) {
    modalWindow.style.display = "none";
  }
  // if(nickName.value === '') {
  //     titleNickname.innerHTML = '<strong style="color: #f44336">Please choose a nickname!</strong>'
  // }
});

var msg__img = document.getElementById("msg__block");

btnSettings.addEventListener("click", () => {
  modalWindow.style.display = "block";
  titleNickname.textContent = nickName.value;
});

function sentMessageOnServer() {
  if (connectStat) {
    if (true) {
      if (textArea.value !== "") {
        event.preventDefault();

        socket.emit("chat", {
          colorName: randomColors,
          message: textArea.value,
          name: submitValue.value,
          imgLink: imgLink.value
        });

        textArea.value = "";
      }
    }
  }
}

window.onload = function() {
  socket.emit("connectedUser", nickName.value);
};

buttonSend.addEventListener("click", () => {
  sentMessageOnServer();
});

textArea.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    sentMessageOnServer();
  }
});

socket.on("usernames", (data, obj) => {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] === submitValue.value) {
      html += `<div class="user" style="border-left: 5px solid #4caf50;">
                <div class="name">${data[i]} (Me)</div>
              </div>`;
    } else {
      html += `<div class="user" style="border-left: 5px solid transparent;">
                <div class="name">${data[i]}</div>
              </div>`;
    }
  }
  users.innerHTML = html;
});

socket.on("leave", data => {
  leave(data);
});

socket.on("chat", data => {
  sendMsg(data);
});

socket.on("history", history => {
  var html = "";
  console.log(history);
  for (var i = 0; i < history.length; i++) {
    html += `
    <div class="msg__block" id="msg__block">
      <img class="img" id="msg__img" src="${history[i].data.imgLink}">
      <div class="data" id="data">
        <div class="user__name" id="user__name" style="color: ${history[i].data.colorName}">${history[i].nick}</div>
        <span class="msg" id="msg">${history[i].data.message}</span></div>
      </div>`;
  }

  block_messageID.innerHTML += html;
});

// socket.on('id', data => {
//     userId = data.id;
//     nickName.value = data.id;
//     titleNickname.textContent = data.id;
// });

socket.on("notification", data => {
  notificationMsg(data);
});

socket.on("disconnect", reason => {
  stat.textContent = "Disconnect";
  stat.classList.remove("status__connect");
  connectStat = false;
});

socket.on("connect", error => {
  stat.textContent = "Connected";
  stat.classList.add("status__connect");
  connectStat = true;
  socket.emit("receiveHistory");
});

socket.on("reconnect_attempt", attemptNumber => {
  console.log(attemptNumber);
});
