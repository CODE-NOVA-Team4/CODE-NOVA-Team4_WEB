import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initiateSocket = (token: string) => {
  socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:8080', {
    auth: {
      token
    }
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const getSocket = () => socket;