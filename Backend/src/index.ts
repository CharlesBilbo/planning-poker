import express from 'express';
import http, { METHODS } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import { arch } from 'os';

const app = express();

app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

app.get( "/", ( req, res ) => {
    console.log('hello world')
    res.send('hello world')
} );

io.on("connection", (socket) => {
    socket.on('user-connected', (arg, callback) => {
        console.log('new user connected')
    })
});

server.listen(8080, () => console.log('listening on 8080'));