import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Carousel} from 'primeng/carousel';
import {Tag} from 'primeng/tag';
import {NgStyle} from '@angular/common';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {IminimalUserinfo} from '../../interfaces/auth';
import {ToastMessageService} from '../../services/toast-message.service';
import {ImageComponentComponent} from '../image-component/image-component.component';

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: 'app-add-new-chat-carousel',
  imports: [
    Carousel,
    Button,
    ImageComponentComponent
  ],
  templateUrl: './add-new-chat-carousel.component.html',
  styleUrl: './add-new-chat-carousel.component.scss'
})
export class AddNewChatCarouselComponent implements OnInit {

  public peoples: IminimalUserinfo[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private chatService: ChatService,
              private authService: AuthService,
              private toastService: ToastMessageService) {
  }

  ngOnInit() {


    this.getPeopleICanStartIChat();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }

    return 'null'
  }

  public getPeopleICanStartIChat() {
    return this.chatService.getPeopleICanStartChat(this.authService.getUserId())
      .subscribe({
        next: (resp) => {
          this.peoples = resp
          console.log(this.peoples)
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.show(
            "error",
            "errore",
            "errore durante il reperimento degli utenti."
          )
        }
      })
  }
}
