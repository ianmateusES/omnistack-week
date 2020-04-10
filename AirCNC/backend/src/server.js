// Micro frame que auxilia na criação da aplicação
const express = require('express');

// Importando o banco de dados
const mongoose = require('mongoose');

// Importando o CORS
const cors = require('cors');

// Importando o Path
const path = require('path');

// Importando as rotas
const routes = require('./routes');

// Procotocos de comunicação
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server); // Mandar e receber mensagem da web e mobile

mongoose.connect('mongodb+srv://?:?@aircnc-rzhif.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/*
    Isso não é aconcelhado para colocar em produção, o bom é usar um banco rapido (redis.oi) para
    armazena os usuários conectados
*/ 
const connectedUsers = {};

// Anotar os usuários conectados
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors()); // Acesso a aplicação do backend
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); // Acesso ao /file retorna a imagem da pasta upload
app.use(routes);


// Acesso da aplicação pela porta 3333
server.listen(3333);



/* Anotar os usuários conectados
io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);

    // Mostra os paramentros recebidos via socket
    console.log(socket.handshake.query);

    // Emite uma mensagem para o usuário logado depois de 4s
    setTimeout(() => {
        socket.emit('hello', 'World');
    }, 4000);

    // Receber uma menssagem chamada omni, print o conteudo dela
    socket.on('omni', data => {
        console.log(data);
    })
});
*/