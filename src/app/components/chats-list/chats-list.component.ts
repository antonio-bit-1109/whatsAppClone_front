import {Component, EventEmitter, Output} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastMessageService} from '../../services/toast-message.service';
import {IChatDto} from '../../interfaces/chat'
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ImageComponentComponent} from '../image-component/image-component.component';
import {ButtonDirective} from 'primeng/button';
import {AddNewChatCarouselComponent} from '../add-new-chat-carousel/add-new-chat-carousel.component';
import {Panel} from 'primeng/panel';
import {HandleWebSocketConnectionService} from '../../services/handle-web-socket-connection.service';
import {take} from 'rxjs';

@Component({
  selector: 'app-chats-list',
  imports: [
    NgForOf,
    DatePipe,
    ImageComponentComponent,
    ButtonDirective,
    AddNewChatCarouselComponent,
    NgIf,
    Panel
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {

  public chatList: IChatDto[] | undefined;

  @Output() emitter = new EventEmitter()

  constructor(private chatService: ChatService,
              private authService: AuthService,
              private toastService: ToastMessageService,
              private webSocketService: HandleWebSocketConnectionService) {

    this.getChatList()
    // this.webSocketService.getsubjectHasObservab().pipe(
    //   take(1)
    // ).subscribe({
    //     next: (objArr) => {
    //       if (objArr && objArr.length > 0) {
    //         this.getChatList();
    //         const lastMessage = objArr[objArr.length - 1];
    //         this.emergeSelectedChat(this.getLastChat(lastMessage))
    //       }
    //       // objArr && this.getChatList()
    //       // this.emergeSelectedChat(this.getLastChat(objArr.pop()))
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       console.error(err.error)
    //     }
    //   }
    // )
  }

  // public getLastChat(obj: IMessageSocket): IChatDto {
  //
  //   if (this.chatList && this.chatList.length > 0) {
  //     const objChat = this.chatList.find(chat => chat.chatIdentity === obj.chatIdentity)
  //     if (objChat) {
  //       return objChat
  //     }
  //   }
  //
  //   return {chatIdentity: "", createdAt: "", listaPartecipanti: [], messaggi: []};
  // }


  public getChatList() {
    this.chatService.getAllUserChat(this.authService.getUserId()).pipe(take(1)).subscribe({
      next: (resp) => {
        this.chatList = resp;

        // dopo che ottengo la chat list iscrivo l'utente a tutte le chat che possiede tramite webSOcket
        // inviando al canale socket "/chat-private/identity_chat"
        this.chatList.map(chat =>
          this.webSocketService.subscribeToPrivateChat(chat.chatIdentity)
        )

      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show("error", "errore", "errore nel reperimento delle chat")
      }
    })
  }

  // passal oggetto chat al componente padre per la visalizzazione dei dati nella finestra di visualizzazione
  // contenente (dati utente e messggi scambiati con il suddetto utente)
  public emergeSelectedChat(obj: IChatDto) {
    this.emitter.emit(obj)
  }

  public takeEmissionFromCarousel(event: any) {
    event && this.getChatList()
  }
}
