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
app.get("/", (req, res) => {
    console.log('hello world');
    res.send('hello world');
});
io.on("connection", (socket) => {
    socket.on('user-connected', (arg, callback) => {
        socket.emit('accepted');
    });
});
server.listen(8080, () => console.log('listening on 8080'));
//# sourceMappingURL=index.js.map