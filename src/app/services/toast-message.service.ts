import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {
  }

  public show(severity: string, summary: string, detail: string, life?: number, keyToast?: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life ? life : 3000,
      key: keyToast ? keyToast : "notify"
    });
  }
}
