import { io } from 'socket.io-client';
const URL: string = 'https://next-task-server.onrender.com';

export const socket = io(URL);
