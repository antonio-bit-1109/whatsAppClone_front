import {Component, OnInit} from '@angular/core';
import {SendMeMessagesService} from '../../services/send-me-messages.service';
import {HttpErrorResponse} from '@angular/common/http';
import {IMessageSent} from '../../interfaces/SendMeMessage';
import {ToastMessageService} from '../../services/toast-message.service';
import {Panel} from 'primeng/panel';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReplayMessageDTO} from '../../interfaces/Message';

@Component({
  selector: 'app-handle-emails',
  imports: [
    Panel,
    NgIf,
    NgForOf,
    FloatLabel,
    InputText,
    Textarea,
    Button,
    DatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './handle-emails.component.html',
  styleUrl: './handle-emails.component.scss'
})
export class HandleEmailsComponent implements OnInit {

  protected allMEssagesSent: IMessageSent[] = []
  protected selected: IMessageSent | null = null;
  protected contentSelected: string | undefined;
  protected emailSelected: string | undefined;

  public sendRespEmail = new FormGroup({
    textArea: new FormControl("", Validators.required),
    object: new FormControl("", Validators.required)
  })

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

  public setSelected(obj: IMessageSent) {
    this.selected = obj
    this.contentSelected = obj.contentMsg;
    this.emailSelected = obj.emailSender
  }

  public onSubmitResp() {

    if (!this.sendRespEmail.valid) {
      this.toastService.show("warn", "Attenzione", "dati non validi.")
      return;
    }

    if (this.selected === null) {
      this.toastService.show("warn", "Attenzione", "seleziona un messaggio a cui rispondere")
    }


    if (this.selected &&
      this.sendRespEmail.get('textArea')
    ) {


      const data: ReplayMessageDTO = {
        idStoredMessage: this.selected.id,
        object: this.sendRespEmail.controls.object.value ? this.sendRespEmail.controls.object.value : "",
        replayMessage: this.sendRespEmail.controls.textArea.value ? this.sendRespEmail.controls.textArea.value : ""
      }


      this.sendMeMessageService.replayToMessage(data).subscribe({
        next: (resp) => {
          console.log(resp)
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.error)
        }
      })
      // chiamo il service per inviare questo messaggio tramite web socket
    }


  }
}
