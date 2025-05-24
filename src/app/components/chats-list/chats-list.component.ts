import {Component} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastMessageService} from '../../services/toast-message.service';
import {IChatDto, Partecipante} from '../../interfaces/chat'
import {DatePipe, NgForOf} from '@angular/common';
import {ImageComponentComponent} from '../image-component/image-component.component';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-chats-list',
  imports: [
    NgForOf,
    DatePipe,
    ImageComponentComponent,
    ButtonDirective
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
        // riordino la lista di chat così che l'utente che sta visualizzando la lista di chat
        // e che si trova nella lista partecipanti, sia sempre ad indice 0 (zero)
        // const fullName = this.authService.getFullName()
        //
        // resp.forEach(obj => {
        //
        //   const currIndex = obj.listaPartecipanti.findIndex(p =>
        //     (p.nome + " " + p.cognome).trim() === fullName
        //   );
        //
        //   if (currIndex !== 0) {
        //     const removed = obj.listaPartecipanti.splice(currIndex, 1)[0]
        //     obj.listaPartecipanti.unshift(removed);
        //   }
        //
        // })
        //
        // this.chatList = resp;
        // console.log(this.chatList)
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show("error", "errore", "errore nel reperimento delle chat")
      }
    })
  }
}
