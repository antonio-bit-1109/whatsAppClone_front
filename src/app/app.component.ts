import {Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {AudioPlayerService} from './services/audio-player.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;


  constructor(private audioPlayerService: AudioPlayerService,
              private router: Router) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.audioPlayerRef !== null) {
      this.audioPlayerService.setAudioElement(this.audioPlayerRef.nativeElement)
    } else {
      console.error("audioplayer element è null dopo afterViewInit")
    }
  }
}
