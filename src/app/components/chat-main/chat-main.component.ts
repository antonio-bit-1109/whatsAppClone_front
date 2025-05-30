import {Component} from '@angular/core';
import {ChatsListComponent} from '../chats-list/chats-list.component';
import {ChatWindowComponent} from '../chat-window/chat-window.component';
import {IChatDto} from '../../interfaces/chat';

@Component({
  selector: 'app-chat-main',
  imports: [
    ChatsListComponent,
    ChatWindowComponent
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {

  public emittedChat: IChatDto | null = null;

  public takeEmittedChatValue(event: any) {
    this.emittedChat = event
  }
}
