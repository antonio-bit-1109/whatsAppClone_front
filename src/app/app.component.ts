import {Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {AudioPlayerService} from './services/audio-player.service';
import {filter} from 'rxjs/operators';
import {UrlHandlerService} from './services/url-handler.service';
import {NavigationBtnComponent} from './components/navigation-btn/navigation-btn.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, NavigationBtnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;


  constructor(private audioPlayerService: AudioPlayerService,
              // sola iniezione del servizio url handler per avviare il tracciamento
              // dell url corrente e dell url precedente
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
