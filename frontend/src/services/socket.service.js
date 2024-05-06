import io from 'socket.io-client';

export const socketService = {
    emit,
    on,
    off,
}

const socket = io('http://3.67.6.184:3030');
socket.connect()


function on(type, cb) {
    socket.on(type, cb)
}

function emit(type, data) {
    socket.emit(type, data)
}

function off(type, listener) {
    socket.off(type, listener);
}