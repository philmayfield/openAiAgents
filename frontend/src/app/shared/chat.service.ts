import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private readonly _messages = new BehaviorSubject<ChatMessage[]>([]);
  private readonly rootUrl = 'http://localhost:3001/api/chat';
  readonly messages$: Observable<ChatMessage[]> = this._messages.asObservable();

  sendJokeRequest(jokeRequest: string): void {
    this.sendMessage(jokeRequest);
  }

  private async sendMessage(userMessage: string): Promise<void> {
    const current = this._messages.value;

    this._messages.next([...current, { role: 'user', content: userMessage }]);

    this.http
      .post<{ reply?: string; error?: string }>(`${this.rootUrl}/joke`, {
        message: userMessage,
      })
      .subscribe({
        next: res => {
          if (res.error) {
            this._messages.next([
              ...this._messages.value,
              { role: 'bot', content: 'Error: ' + res.error },
            ]);
          } else {
            this._messages.next([
              ...this._messages.value,
              { role: 'bot', content: res.reply ?? '' },
            ]);
          }
        },
        error: err => {
          this._messages.next([
            ...this._messages.value,
            {
              role: 'bot',
              content: 'Error: ' + (err instanceof Error ? err.message : 'Unknown error'),
            },
          ]);
        },
      });
  }
}
