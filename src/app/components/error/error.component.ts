import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Panel} from 'primeng/panel';
import {LogoAppComponent} from '../logo-app/logo-app.component';

@Component({
  selector: 'app-error',
  imports: [
    Panel,
    RouterLink,
    LogoAppComponent
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  public errMsg: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) {

    const errParam = this.activatedRoute.snapshot.queryParamMap.get('err');
    if (errParam) {
      this.errMsg = this.formatMsg(errParam);
    }
  }


  public formatMsg(msgToFormat: string): string {
    return msgToFormat.replaceAll(",", " ");
  }
}
