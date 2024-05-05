const socketIo = require('socket.io');
const loggerService = require('./logger.service');

let io;

const initializeSocket = (httpServer) => {
    io = socketIo(httpServer);

    // Define Socket.io event handlers here
    io.on('connection', (socket) => {
        console.log('A user connected');
        loggerService.info('A user connected')
        // Example: Send a message to the client when a new connection is established
        socket.emit('message', 'Welcome to the server!');
    });
};

// Emit an event to all connected clients
const emitEventToClients = (eventName, data) => {
    io.emit(eventName, data);
};

module.exports = { initializeSocket, emitEventToClients };
