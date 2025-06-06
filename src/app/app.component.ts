import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {AudioPlayerService} from './services/audio-player.service';
import {UrlHandlerService} from './services/url-handler.service';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {ChatService} from './services/chat.service';
import {IDataToast} from './interfaces/chat';
import {ToastMessageService} from './services/toast-message.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SubjectService} from './services/subject.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Button, PrimeTemplate],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;


  constructor(private audioPlayerService: AudioPlayerService,
              // sola iniezione del servizio url handler per avviare il tracciamento
              // dell url corrente e dell url precedente
              // LASCIALO LI DOV'È !!
              private urlHandler: UrlHandlerService,
              private router: Router,
              private chatService: ChatService,
              private toastService: ToastMessageService,
              private subjectService: SubjectService
  ) {
  }


  ngAfterViewInit() {
    if (this.audioPlayerRef !== null) {
      this.audioPlayerService.setAudioElement(this.audioPlayerRef.nativeElement)
    } else {
      console.error("audioplayer element è null dopo afterViewInit")
    }

  }


  // quando viene cliccato il bottone nel toast si naviga all url specificato e non ci si trova li ,
  // si chiude il toast
  // si riottiene la chat aggiornata da passare tramite behaviour subject al componente chat window
  public async redirectAndShowChat(message: IDataToast) {
    if (this.router.url !== '/home/chats-main') {
      await this.router.navigateByUrl(message.data.url);
    }
    this.toastService.dismissToast("interactiveToast")
    this.chatService.getChatByIdentity(message.data.chatIdentity, message.data.email, '')
      .subscribe({
        next: (resp) => {
          console.log(resp, "questa è la risposta da passare al componente per visualizzare la chat al click del tost ");
          this.subjectService.fillChat(resp);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.error)
        }
      })
  }
}
