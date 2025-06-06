import {Component, OnInit} from '@angular/core';
import {SendMeMessagesService} from '../../services/send-me-messages.service';
import {HttpErrorResponse} from '@angular/common/http';
import {IMessageSent} from '../../interfaces/SendMeMessage';
import {ToastMessageService} from '../../services/toast-message.service';
import {Panel} from 'primeng/panel';
import {NgForOf, NgIf} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-handle-emails',
  imports: [
    Panel,
    NgIf,
    NgForOf
  ],
  templateUrl: './handle-emails.component.html',
  styleUrl: './handle-emails.component.scss'
})
export class HandleEmailsComponent implements OnInit {

  protected allMEssagesSent: IMessageSent[] = []
  protected selected: IMessageSent | null = null;

  constructor(private sendMeMessageService: SendMeMessagesService,
              private toastService: ToastMessageService) {
  }

  ngOnInit() {
    this.sendMeMessageService.getAllEmailsSentToMe().subscribe({
      next: (resp) => {
        this.allMEssagesSent = resp;
        this.allMEssagesSent.length === 0 && this.toastService.show("info", "email", "nessuna email da visualizzare.")
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error)
        this.toastService.show("error", "errore reperimento messaggi", "impossibile reperire le email.")
      }
    })
  }

  public handleBoolean(val: boolean) {
    return val ? "Si" : "No";
  }
}
