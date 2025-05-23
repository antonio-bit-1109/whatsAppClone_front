import {Component} from '@angular/core';
import {ChatsListComponent} from '../chats-list/chats-list.component';
import {ChatEditorComponent} from '../chat-editor/chat-editor.component';

@Component({
  selector: 'app-chat-main',
  imports: [
    ChatsListComponent,
    ChatEditorComponent
  ],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {

}
