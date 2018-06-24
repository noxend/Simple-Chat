var express = require('express');
var socket = require('socket.io');
var mongo = require('mongodb').MongoClient;
var port = 1285;
var app = express();

var idList = {};
var clientsID = [];
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

    contClients++;
    //idList[socket.id] = socket.id;
    io.clients((error, clients) => {
        if (error) throw error;
        clientsID = clients;
    });

    socket.on('chat', (data) => {
        
        if(data.message !== ''){
            if(data.name !== ''){
                io.emit('chat', data);
            }
        }
        if(data.message === '/exit'){
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

        clientsID.forEach((id, i, clientsID) => {
            if(clientsID[i] === socket.id) {
                io.emit('leave', {
                    id: socket.id
                });
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
});

