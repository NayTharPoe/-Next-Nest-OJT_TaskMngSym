import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})
export class SocketIoGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('message', 'A new client has connected');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('message', 'A client has disconnected');
  }

  @SubscribeMessage('reportCreated')
  handleReportCreateMessage(client: Socket, data: any) {
    this.server.emit('createReportNotifications', data);
  }

  @SubscribeMessage('taskCreated')
  handleTaskCreateMessage(client: Socket, data: any) {
    this.server.emit('createTaskNotifications', data);
  }

  @SubscribeMessage('taskUpdated')
  handleTaskUpdateMessage(client: Socket, data: any) {
    this.server.emit('updateTaskNotifications', data);
  }
}
