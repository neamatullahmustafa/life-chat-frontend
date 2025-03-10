import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { Message } from '../chat';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService) {}
  username: string = 'username';
  message: string = 'message';
  messages: Message[] = [
  ];

  submit(): void {
    this.chatService
      .sendMessage(this.username, this.message)
      .subscribe(
      //   (data: any) => {
      //   this.messages.push(data);
      // }
    );
  }
  ngOnInit(): void {
    Pusher.logToConsole = true;

const pusher = new Pusher('5f137363a1a9a7a57eea', {
  cluster: 'eu',
});

// Subscribe to the channel
const channel = pusher.subscribe('chat');

// Handle subscription success
channel.bind('pusher:subscription_succeeded', () => {
  console.log('Successfully subscribed to chat channel');
});

// Handle errors
pusher.connection.bind('error', (err: any) => {
  console.error('Pusher error:', err);
});

// Listen for messages
channel.bind('message', (data: any) => {
  this.messages.push(data);
  console.log('Message received:', data);
});
  }
}
