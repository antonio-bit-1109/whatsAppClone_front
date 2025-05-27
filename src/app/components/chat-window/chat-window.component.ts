import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ChatEditorComponent} from '../chat-editor/chat-editor.component';
import {IChatDto} from '../../interfaces/chat';
import {Panel} from 'primeng/panel';
import {ImageComponentComponent} from '../image-component/image-component.component';
import {Button} from 'primeng/button';
import {NgForOf, NgIf} from '@angular/common';
import {UtilityMethodService} from '../../services/utility-method.service';
import {ComicComponent} from '../comic/comic.component';
import {ChatService} from '../../services/chat.service';
import {IMessageAddChat} from '../../interfaces/Message';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat-window',
  imports: [
    ChatEditorComponent,
    Panel,
    ImageComponentComponent,
    Button,
    NgIf,
    NgForOf,
    ComicComponent
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnChanges {

  @Input() public selectedchat: IChatDto | null = null;
  public populated: boolean = false;
  public markdownContent: string | undefined;
  public cleanMarkdown: string | null = null;

  constructor(protected utilityMethod: UtilityMethodService,
              private chatService: ChatService,
              private authService: AuthService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedchat']) {
      const currValue = changes['selectedchat'].currentValue;
      if (currValue) {
        this.populated = true;
      }
    }
  }

  public takePartecipante() {
    return this.selectedchat && this.selectedchat?.listaPartecipanti ?
      this.selectedchat.listaPartecipanti[0] : [][0]
  }

  // inviare il messaggio al server
  public sendMessage() {

    if (this.markdownContent === "" || !this.markdownContent) {
      return
    }

    const reqData: IMessageAddChat = {
      chatIdentity: this.selectedchat?.chatIdentity ? this.selectedchat.chatIdentity : "default",
      text: this.markdownContent ? this.markdownContent : "default",
      userOwnerId: this.authService.getUserId()
    }

    this.chatService.addMessageToChat(reqData).subscribe({
      next: (resp) => {
        console.log(resp)
        this.cleanMarkdown = crypto.randomUUID()
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error)
      }
    })
  }

  // prende il markdown presente nel componente app-chat-editor
  // e lo salva dentro la prop this.markdownContent
  public getMarkDown(event: any) {
    this.markdownContent = event;
  }
}
