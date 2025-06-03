import {Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy} from '@angular/core';
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
import {HandleWebSocketConnectionService} from '../../services/handle-web-socket-connection.service';
import {CompScrollDownComponent} from '../comp-scroll-down/comp-scroll-down.component';

@Component({
  selector: 'app-chat-window',
  imports: [
    ChatEditorComponent,
    Panel,
    ImageComponentComponent,
    Button,
    NgIf,
    NgForOf,
    ComicComponent,
    CompScrollDownComponent
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnChanges, OnInit, OnDestroy {

  @Input() public selectedchat: IChatDto | null = null;
  public populated: boolean = false;
  public markdownContent: string | undefined;
  public cleanMarkdown: string | null = null;
  public isNewMessagesArrived: boolean = false;

  constructor(protected utilityMethod: UtilityMethodService,
              private chatService: ChatService,
              private authService: AuthService,
              private webSocketService: HandleWebSocketConnectionService) {

    // document.addEventListener("scroll", () => {
    //   this.checkIfAlreadyScrolledToBottom()
    //   console.log("listener aggiunto")
    // })
  }

  ngOnInit() {
    this.webSocketService.$getRefetchChats().subscribe(value => {
      console.log(value, "value da cui estrarre dati per fare la fetch per get chat ")
      if (value &&
        this.selectedchat &&
        this.selectedchat.chatIdentity
      ) {
        console.log(value, "VALUEEEEEEE")
        this.getChat(this.selectedchat.chatIdentity, value.userEmail, value.userId)
      }
    })
  }

  ngOnDestroy() {
    // document.removeEventListener("scroll", () => {
    //   console.log("listener rimosso")
    // })
  }

  public getChat(identity: string, userEmail: string, userId: string) {
    this.chatService.getChatByIdentity(identity, userEmail, userId).subscribe({
      next: (resp) => {
        const sortedMessages = this.orderMessagesByDate(resp)
        this.selectedchat = {
          messaggi: sortedMessages,
          listaPartecipanti: resp.listaPartecipanti,
          createdAt: resp.createdAt,
          chatIdentity: resp.chatIdentity
        }
        this.isNewMessagesArrived = true;
      },
      error: (err: HttpErrorResponse) => {
      }
    })
  }

  private orderMessagesByDate(resp: IChatDto) {
    return resp.messaggi.sort((a, b) =>
      Date.parse(a.sendAtTime) - Date.parse(b.sendAtTime))
  }

  public scrollToBottom() {
    setTimeout(() => {
      const scrollableDiv = document.getElementById("scrollableDiv");
      if (scrollableDiv) {
        // Usa scrollTo con behavior: 'smooth' per una transizione fluida
        scrollableDiv.scrollTo({
          top: scrollableDiv.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100)
    this.isNewMessagesArrived = false;
  }

  public checkIfAlreadyScrolledToBottom(event: Event) {

    const scrollableDiv = event.target as HTMLElement
    const isAtBottom = Math.abs(scrollableDiv.scrollHeight - scrollableDiv.scrollTop - scrollableDiv.clientHeight) < 10;

    if (isAtBottom) {
      this.isNewMessagesArrived = false
    }

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
        this.webSocketService.refetchChats.next({
          userEmail: "",
          randomUUID: crypto.randomUUID(),
          userId: reqData.userOwnerId.toString()
        })
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
