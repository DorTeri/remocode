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
        console.log('A user connected');
        loggerService.info('A user connected');

        // Example: Send a message to the client when a new connection is established
        socket.emit('message', 'Welcome to the server!');


        socket.on('joinCodeBlock', (codeBlockId) => {
            loggerService.info('A user joinCodeBlock');
            // Increment the user count for the code block
            usersByCodeBlock[codeBlockId] = (usersByCodeBlock[codeBlockId] || 0) + 1;
    
            // Determine the role of the user based on the user count
            const role = usersByCodeBlock[codeBlockId] === 1 ? 'mentor' : 'student';
            
            // Emit the role to the client
            socket.emit('role', role);
        });

        // Handle code block update event
        socket.on('updateCodeBlock', async ({ id, code }) => {
            try {
                // Update code block in the database
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
