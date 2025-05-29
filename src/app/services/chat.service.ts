import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IChatDto} from '../interfaces/chat';
import {IminimalUserinfo} from '../interfaces/auth';
import {AuthService} from './auth.service';
import {ISuccessResponse} from '../interfaces/SuccessResponse';
import {IMessageAddChat} from '../interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = "http://localhost:8080/chat/rest"
  private url1 = "http://localhost:8080/auth"

  constructor(private http: HttpClient,
              private authService: AuthService
  ) {
  }

  public getAllUserChat(iduser: number): Observable<IChatDto[]> {
    return this.http.get<IChatDto[]>(`${this.url}/get/all/mine/${iduser}`)
  }

  public getPeopleICanStartChat(idUser: number): Observable<IminimalUserinfo[]> {
    return this.http.get<IminimalUserinfo[]>(`${this.url1}/get/all/${idUser}`)
  }

  public startingANewChat(person: IminimalUserinfo): Observable<ISuccessResponse> {
    const arr = []
    arr.push(person.id)
    arr.push(this.authService.getUserId())
    const obj = {
      listaPartecipanti: arr
    }

    return this.http.post<ISuccessResponse>(`${this.url}/create`, obj)
  }


  public addMessageToChat(data: IMessageAddChat) {
    return this.http.post(`${this.url}/post/message`, data)
  }

  public getChatByIdentity(identity: string, userEmail: string, userId: string): Observable<IChatDto> {
    return this.http.get<IChatDto>(`${this.url}/get/chat?identity=${identity}&userEmail=${userEmail}&userId=${userId}`)
  }
}
