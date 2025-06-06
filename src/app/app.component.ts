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
              private toastService: ToastMessageService
  ) {
  }


  ngAfterViewInit() {
    if (this.audioPlayerRef !== null) {
      this.audioPlayerService.setAudioElement(this.audioPlayerRef.nativeElement)
    } else {
      console.error("audioplayer element è null dopo afterViewInit")
    }

  }


  public redirectAndShowChat(message: IDataToast) {
    void this.router.navigateByUrl(message.data.url);
    this.toastService.dismissToast("interactiveToast")
  }
}
