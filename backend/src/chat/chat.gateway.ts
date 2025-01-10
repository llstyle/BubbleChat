import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { SendMessageDto } from './dto/sendMessage.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  private messages: SendMessageDto[] = [];
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new WsException(errors),
    }),
  )
  @SubscribeMessage('send')
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SendMessageDto,
  ) {
    if (this.messages.length > 100) {
      this.messages.shift();
    }
    this.messages.push(data);
    client.broadcast.emit('messages', this.messages);
  }
  handleConnection(client: Socket) {
    client.emit('messages', this.messages);
  }
}
