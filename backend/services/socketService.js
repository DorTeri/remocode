const socketIo = require('socket.io');
const loggerService = require('./logger.service');
const CodeBlock = require('../models/codeBlock.model');

let io;
const usersByCodeBlock = {};

const initializeSocket = (httpServer) => {
    io = socketIo(httpServer, {
        cors: {
            origin: ["http://localhost:3000", "https://remocode.onrender.com"],
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {

        // When a user joins a codeBlock
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

        // Changing the codeBlock
        socket.on('updateCodeBlock', async ({ id, code }) => {
            try {
                const updatedCodeBlock = await CodeBlock.findByIdAndUpdate(id, { code }, { new: true });

                io.emit('codeBlockUpdate', updatedCodeBlock);
            } catch (error) {
                loggerService.error('Error updating code block:', error);
            }
        });

        // Clearing the users inside of the codeBlock
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


const emitEventToClients = (eventName, data) => {
    io.emit(eventName, data);
};

module.exports = { initializeSocket, emitEventToClients };
