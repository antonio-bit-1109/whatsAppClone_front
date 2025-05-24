import {Component} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastMessageService} from '../../services/toast-message.service';
import {IChatDto, Partecipante} from '../../interfaces/chat'
import {DatePipe, NgForOf} from '@angular/common';
import {ImageComponentComponent} from '../image-component/image-component.component';
import {ButtonDirective} from 'primeng/button';
import {AddNewChatCarouselComponent} from '../add-new-chat-carousel/add-new-chat-carousel.component';

@Component({
  selector: 'app-chats-list',
  imports: [
    NgForOf,
    DatePipe,
    ImageComponentComponent,
    ButtonDirective,
    AddNewChatCarouselComponent
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {

  public chatList: IChatDto[] | undefined;

  constructor(private chatService: ChatService,
              private authService: AuthService,
              private toastService: ToastMessageService) {

    this.getChatList()
  }


  public getChatList() {
    this.chatService.getAllUserChat(this.authService.getUserId()).subscribe({
      next: (resp) => {
        this.chatList = resp;
        console.log(resp, "risposta my dearrrr")
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show("error", "errore", "errore nel reperimento delle chat")
      }
    })
  }
}
