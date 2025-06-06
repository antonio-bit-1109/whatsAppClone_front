import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IChatDto} from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  // public $getChatAgain = new BehaviorSubject<null | string>(null);
  public chatToPassAfterToastClick = new BehaviorSubject<null | IChatDto>(null)

  constructor() {
  }

  public fillChat(val: IChatDto) {
    this.chatToPassAfterToastClick.next(val);
  }

  public $getRefetchedChat() {
    return this.chatToPassAfterToastClick.asObservable();
  }

}
