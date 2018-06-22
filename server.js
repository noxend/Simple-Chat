var express = require('express');
var socket = require('socket.io');
var mongo = require('mongodb').MongoClient;
var port = 1285;
var app = express();

var idList = {};
var contClients = 0;

// mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
    
//     if(err){
//         throw err;
//     }

//     console.log('MongoDB connected...');
    
//     db.close();
// });

var server = app.listen(port, () => {
    console.log(`Listeningh ${port} port`);
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
    idList[socket.id] = socket.id;
    contClients++;

    socket.on('chat', (data) => {
        io.emit('chat', data);

        if(data.message === 'exit'){
                socket.disconnect();
        }
    });

    socket.emit('id', {
        id: socket.id
    });

    socket.emit('notification', {
        welcome: 'Welcome to our chat! 😄',
        errorNickname: 'Please choose a nickname!'
    });

    socket.on('disconnect', reason => {
        contClients--;
        
        if(idList[socket.id]){

            io.sockets.emit('leave', {
                id: socket.id
            });
            delete idList[socket.id];
        }
    });
});

