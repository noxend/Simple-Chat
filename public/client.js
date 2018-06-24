// import React from 'react'
// import {render} from 'react-dom'

var buttonSend = document.getElementById('buttonSend'),
    nickName = document.getElementById('nickName'),
    textArea = document.getElementById('textArea'),
    block_messageID = document.getElementById('block_messageID'),
    stat = document.getElementById('status'),
    form = document.getElementById('form'),
    userActive = document.getElementsByClassName('user'),
    bodyPage = document.getElementById('body'),
    modalWindow = document.getElementById('modalWindowId'),
    btnSettings = document.getElementById('settings'),
    titleNickname = document.getElementById('title'),
    btnCloseModal = document.getElementById('btnCloseModal'),
    settings = document.getElementById('settings');


// var socket = io.connect('https://chat-on-nodejs--noxios5674.repl.co/');
var socket = io.connect('http://localhost:1285');

var userId = '';
var connectStat = false;
//var nickname = '';

var colors = ['#232526', '#757F9A', '#5C258D', '#4389A2', '#134E5E', '#71B280', '#085078', '#FF8008', '#1D976C', '#EB3349',
    '#F45C43', '#DD5E89', '#1D2B64', '#FF512F', '#F09819', '#AA076B'];

var rand = Math.floor(Math.random() * colors.length);
var randomColors = colors[rand];

function notificationMsg(value) {

    var msg = document.createElement('div');
    msg.classList.add('message');
    block_messageID.appendChild(msg);
    msg.innerHTML = `<strong>${value.welcome}</strong>`;
}

function sendMsg(value) {

    var msg = document.createElement('div');
    msg.classList.add('message');
    block_messageID.appendChild(msg);
    msg.innerHTML = `<strong style="color: ${value.colorName}">${value.name}:</strong> ${value.message}`;

    block_messageID.scrollTop = block_messageID.scrollHeight;
}

// function joinUser(value) {

//     var msg = document.createElement('div');
//     msg.classList.add('message');
//     block_messageID.appendChild(msg);
//     msg.innerHTML = `<strong style="color:#a2a2a2">${value.join}</strong> joined`;
// }

function errorNickname(value) {

    var msg = document.createElement('div');
    msg.classList.add('message');
    block_messageID.appendChild(msg);
    msg.innerHTML = `<strong style="color: #f44336">${value.errorNickname}</strong>`;
}

function leave(value) {

    var msg = document.createElement('div');
    msg.classList.add('message');
    block_messageID.appendChild(msg);
    msg.innerHTML = `<div style="color: #a2a2a2; font-style: italic;"><strong>${value.id}</strong> left</div>`;
}

function newConect(value) {

    var msg = document.createElement('div');
    msg.classList.add('message');
    block_messageID.appendChild(msg);
    msg.innerHTML = `<div style="color: #a2a2a2; font-style: italic;"><strong>${value.nickname}</strong> join</div>`;
}

// function funUserId(){
//     if(userId === userId){

//     }
// }

btnCloseModal.addEventListener('click', function () {
    modalWindow.style.display = 'none';
    titleNickname.textContent = nickName.value;

    socket.emit('leave', {
        name: nickName.value
    });

    if(nickName.value === '') {
        titleNickname.innerHTML = '<strong style="color: #f44336">Please choose a nickname!</strong>'
    }

    // bodyPage.style.backgroundImage = `url(${})`;
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        modalWindow.style.display = 'none';
    }
});

btnSettings.addEventListener('click', () => {
    modalWindow.style.display = 'block';
    titleNickname.textContent = nickName.value;
});

buttonSend.addEventListener('click', () => {
    if (connectStat) {
        if (nickName.value !== '') {
            if (textArea.value !== '') {
                event.preventDefault();

                socket.emit('chat', {
                    colorName: randomColors,
                    message: textArea.value,
                    name: nickName.value,
                    id: userId
                });

                textArea.value = '';
            }
        }
    }
});
textArea.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {
        if (connectStat) {
            if (nickName.value !== '') {
                if (textArea.value !== '') {
                    event.preventDefault();
    
                    socket.emit('chat', {
                        colorName: randomColors,
                        message: textArea.value,
                        name: nickName.value,
                        id: userId
                    });
    
                    textArea.value = '';
                }
            }
        }
    }
});


socket.on('leave', data => {
    leave(data);
});

socket.on('chat', data => {
    console.log(data);
    sendMsg(data);
});

socket.on('id', data => {
    userId = data.id;
    nickName.value = data.id;
    titleNickname.textContent = data.id;
});

socket.on('notification', data => {
    notificationMsg(data);
    // errorNickname(data);
});

socket.on('disconnect', (reason) => {
    stat.textContent = 'Disconnect';
    stat.classList.remove('status__connect');
    connectStat = false;

    console.log(reason);
});

socket.on('connect', (error) => {    

    stat.textContent = 'Connected';
    stat.classList.add('status__connect');
    connectStat = true;
    console.log('connected');

});

socket.on('reconnect_attempt', (attemptNumber) => {
    console.log(attemptNumber);
});
