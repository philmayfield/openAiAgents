import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Joke endpoint
  @Post('joke')
  async tellJoke(@Body('message') message: string) {
    if (!message || typeof message !== 'string') {
      return { error: 'Message is required.' };
    }
    return this.chatService.tellJoke(message);
  }
}
