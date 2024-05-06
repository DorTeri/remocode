const socketIo = require('socket.io');
const loggerService = require('./logger.service');
const CodeBlock = require('../models/codeBlock.model');

let io;
const usersByCodeBlock = {};

const initializeSocket = (httpServer) => {
    io = socketIo(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
          }
    });

    io.on('connection', (socket) => {

        socket.on('joinCodeBlock', (codeBlockId) => {
            loggerService.info('A user joinCodeBlock');
    
            // Check user role
            const role = usersByCodeBlock[codeBlockId] ? 'mentor' : 'student';
            
            socket.emit('role', role);
        });

        socket.on('updateCodeBlock', async ({ id, code }) => {
            try {
                loggerService.info("id", id)
                const updatedCodeBlock = await CodeBlock.findByIdAndUpdate(id, { code }, { new: true });
                
                // Broadcast the updated code block to all connected clients
                io.emit('codeBlockUpdate', updatedCodeBlock);
            } catch (error) {
                loggerService.error('Error updating code block:', error);
            }
        });
    });
};


// Emit an event to all connected clients
const emitEventToClients = (eventName, data) => {
    io.emit(eventName, data);
};

module.exports = { initializeSocket, emitEventToClients };
