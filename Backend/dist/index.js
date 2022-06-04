"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});
const players = [];
io.on("connection", (socket) => {
    socket.on('new-player-connected', (data) => {
        socket.emit('new-player', {
            'name': data.name
        });
    });
});
server.listen(8080, () => console.log('listening on 8080'));
//# sourceMappingURL=index.js.map