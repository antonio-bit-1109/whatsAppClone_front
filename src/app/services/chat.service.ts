import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastMessageService} from './toast-message.service';
import {Observable} from 'rxjs';
import {IChatDto} from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = "http://localhost:8080/chat/rest"

  constructor(private http: HttpClient,
              private toastMessage: ToastMessageService) {
  }

  public getAllUserChat(iduser: number): Observable<IChatDto[]> {
    return this.http.get<IChatDto[]>(`${this.url}/get/all/mine/${iduser}`)
  }
}
