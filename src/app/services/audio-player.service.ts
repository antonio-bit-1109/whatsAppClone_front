import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  private audioPlayer: HTMLAudioElement | null = null;

  constructor() {
  }

  public startNewAudio(src: string) {
    this.resetPlayer();
    this.changeAudioSource(src);
    this.startAudio()
  }

  public setAudioElement(audioElem: HTMLAudioElement) {
    this.audioPlayer = audioElem;
  }


  private resetPlayer() {
    this.audioPlayer && this.audioPlayer.pause();
    this.audioPlayer ? this.audioPlayer.currentTime = 0 : null;
  }

  private changeAudioSource(src: string) {
    this.audioPlayer ? this.audioPlayer.src = src : null;
  }

  private startAudio() {
    this.audioPlayer ? this.audioPlayer.play() : null;
  }

  public stopAudio() {
    this.audioPlayer ? this.audioPlayer.pause() : null;
  }
}
