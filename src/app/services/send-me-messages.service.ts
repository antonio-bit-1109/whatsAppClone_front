import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IMessageSent, ISendMeMessage} from '../interfaces/SendMeMessage';
import {Observable} from 'rxjs';
import {ISuccessResponse} from '../interfaces/SuccessResponse';
import {IMessage} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SendMeMessagesService {

  private url = "http://localhost:8080/sendMessage"

  constructor(private http: HttpClient) {
  }


  public sendMeMessage(data: ISendMeMessage): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>(`${this.url}/toMe`, data)
  }

  public getAllEmailsSentToMe(): Observable<IMessageSent[]> {
    return this.http.get<IMessageSent[]>(`${this.url}/get/all`)
  }
}
