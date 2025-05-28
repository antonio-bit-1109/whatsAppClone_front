import {Injectable} from '@angular/core';
// @ts-ignore
import SockJS from 'sockjs-client';
import {IMessage, Stomp} from '@stomp/stompjs';
import {AuthService} from './auth.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleWebSocketConnectionService {

  private stompClient: any;

  constructor(private authService: AuthService) {
  }


  // connect to webSocket all avvio dellapplicazione ??
  public connectToServerSocket(serverPort: string) {
    console.log("try to connecting web socket ...")

    if (this.isAlreadyConnected()) {
      console.log("socket already connected... no action needed")
      return;
    }

    const token = this.authService.getToken();

    // passando il token al server faccio un ulteriore controllo che l'utente che si sta collegando sia un utente autenticato gia in precedenza
    const socket = new SockJS(`http://localhost:${serverPort}/ws?token=${token}`);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log("WebSocket connected!");

    }, (error: any) => {
      console.error("WebSocket connection error:", error);
    });

  }

  public disconnectToServerSocket() {
    this.stompClient.disconnect(() => {
      console.log("disconnessione dal socket server....")
    })
  }


  public subscribeToPrivateChat(chatIdentity: string) {
    this.stompClient.subscribe(`/chat-private/${chatIdentity}`, (message: any) => {
      console.log("collegato alla chat: " + chatIdentity);
      // Estrai il contenuto del messaggio dal body
      const messageContent = (message.body);
      console.log(messageContent, "MESSAGE CONTENTTTTTT")
    })
  }


  public isAlreadyConnected(): boolean {
    return this.stompClient && this.stompClient.connected
  }
}
