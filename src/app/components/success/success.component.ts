import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Panel} from 'primeng/panel';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AuthService} from '../../services/auth.service';
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {AudioPlayerService} from '../../services/audio-player.service';
import {ButtonDirective} from 'primeng/button';
import {ToastMessageService} from '../../services/toast-message.service';

@Component({
  selector: 'app-success',
  imports: [
    Panel,
    ProgressSpinner,
    LogoAppComponent,
    ButtonDirective
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  private readonly token: string;


  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private audioplayerService: AudioPlayerService,
              private toastService: ToastMessageService) {

    const token = this.activatedRoute.snapshot.queryParamMap.get("token")
    this.token = token ? token : "null";
    this.authService.saveToken(this.token);
  }

  public redirectHome() {
    this.audioplayerService.startNewAudio("assets/fart3.mp3")
    void this.router.navigateByUrl("/home")
    this.toastService.show("success", "login", "Hai correttamente effettuato l'accesso tramite Google")
  }
}
