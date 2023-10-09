import { io } from 'socket.io-client';
const URL: string = 'https://nest-task-mng-sym-server.onrender.com';

export const socket = io(URL);
