import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IChatDto} from '../interfaces/chat';
import {IminimalUserinfo} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = "http://localhost:8080/chat/rest"
  private url1 = "http://localhost:8080/auth"

  constructor(private http: HttpClient,
  ) {
  }

  public getAllUserChat(iduser: number): Observable<IChatDto[]> {
    return this.http.get<IChatDto[]>(`${this.url}/get/all/mine/${iduser}`)
  }

  public getPeopleICanStartChat(idUser: number): Observable<IminimalUserinfo[]> {
    return this.http.get<IminimalUserinfo[]>(`${this.url1}/get/all/${idUser}`)
  }
}
