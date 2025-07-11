import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-tell-joke',
  imports: [CommonModule, ChatComponent],
  templateUrl: './tell-joke.component.html',
  styleUrl: './tell-joke.component.scss',
})
export class TellJokeComponent {
  private chatService = inject(ChatService);

  messages$ = this.chatService.messages$;

  handleSendMessage(message: string) {
    this.chatService.sendJokeRequest(message);
  }
}
