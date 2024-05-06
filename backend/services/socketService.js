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

            let role = 'student'

            if (!usersByCodeBlock[codeBlockId] || !usersByCodeBlock[codeBlockId][0]) {
                usersByCodeBlock[codeBlockId] = [socket.id]
                role = 'mentor'
            } else {
                usersByCodeBlock[codeBlockId].push(socket.id)
            }


            socket.emit('role', role);
        });

        socket.on('updateCodeBlock', async ({ id, code }) => {
            try {
                const updatedCodeBlock = await CodeBlock.findByIdAndUpdate(id, { code }, { new: true });

                io.emit('codeBlockUpdate', updatedCodeBlock);
            } catch (error) {
                loggerService.error('Error updating code block:', error);
            }
        });

        socket.on('clearUsersBlock', async (codeBlockId) => {
            try {
                if(!usersByCodeBlock[codeBlockId]) return
                usersByCodeBlock[codeBlockId] = usersByCodeBlock[codeBlockId].filter(socketId => 
                    socketId !== socket.id
                )
            } catch (error) {
                loggerService.error('Error diconnect code block:', error);
            }
        });
    });
};


// Emit an event to all connected clients
const emitEventToClients = (eventName, data) => {
    io.emit(eventName, data);
};

module.exports = { initializeSocket, emitEventToClients };
