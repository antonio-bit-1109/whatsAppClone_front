import {Component} from '@angular/core';
import {ChatEditorComponent} from '../chat-editor/chat-editor.component';

@Component({
  selector: 'app-chat-window',
  imports: [
    ChatEditorComponent
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

}
