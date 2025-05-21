import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {Panel} from "primeng/panel";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RoutesRecognized} from "@angular/router";
import {LogoAppComponent} from '../logo-app/logo-app.component';
import {InputText} from 'primeng/inputtext';
import {filter, pairwise, take} from 'rxjs/operators';


@Component({
  selector: 'app-send-email',
  imports: [
    Panel,
    ReactiveFormsModule,
    FloatLabel,
    Button,
    RouterLink,
    LogoAppComponent,
    InputText,
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent implements OnInit {

  public isAutenticated: boolean = false;
  private previousUrl: string = '';
  private currentUrl: string = '';


  public sendEmailForm = new FormGroup({
    email: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required)
  })

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {


  }

  ngOnInit() {

  }


  public takeNoteOfPreviuosAndCurrentRoute() {

    // this.router.events.pipe(
    //   take(1)
    // )
    //   .subscribe({
    //     next:(event) => {
    //       this.previousUrl = event
    //     }
    //   })
  }

  sendEmail() {

  }
}
