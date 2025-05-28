import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {AudioPlayerService} from './services/audio-player.service';
import {UrlHandlerService} from './services/url-handler.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;


  constructor(private audioPlayerService: AudioPlayerService,
              // sola iniezione del servizio url handler per avviare il tracciamento
              // dell url corrente e dell url precedente
              // LASCIALO LI DOV'È !!
              private urlHandler: UrlHandlerService
  ) {

  }


  ngAfterViewInit() {
    if (this.audioPlayerRef !== null) {
      this.audioPlayerService.setAudioElement(this.audioPlayerRef.nativeElement)
    } else {
      console.error("audioplayer element è null dopo afterViewInit")
    }

  }


}
