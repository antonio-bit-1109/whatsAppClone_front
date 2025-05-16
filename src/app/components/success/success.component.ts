import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Panel} from 'primeng/panel';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AuthService} from '../../services/auth.service';
import {LogoAppComponent} from '../logo-app/logo-app.component';

@Component({
  selector: 'app-success',
  imports: [
    Panel,
    ProgressSpinner,
    LogoAppComponent
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  private readonly token: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {

    const token = this.activatedRoute.snapshot.queryParamMap.get("token")
    this.token = token ? token : "null";
    this.authService.saveToken(this.token);
    setTimeout(() => {
      this.router.navigateByUrl("/home")
    }, 2000)
  }
}
