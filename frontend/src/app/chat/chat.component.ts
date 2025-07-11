import { Component, OnInit, ViewChild, ElementRef, output, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  messages = input<ChatMessage[]>();
  sendMessage = output<string>();

  formGroup = new FormGroup({
    userInput: new FormControl(''),
  });

  get userInputControl() {
    return this.formGroup.controls.userInput;
  }

  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    // Focus input on load
    setTimeout(() => this.inputEl?.nativeElement.focus(), 0);
  }

  onSendMessage(): void {
    const text = this.userInputControl.value?.trim();
    if (text) {
      this.sendMessage.emit(text);
      this.userInputControl.setValue('');
    }
  }
}
