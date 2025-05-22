import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ISendMeMessage} from '../interfaces/SendMeMessage';
import {Observable} from 'rxjs';
import {ISuccessResponse} from '../interfaces/SuccessResponse';

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
}
