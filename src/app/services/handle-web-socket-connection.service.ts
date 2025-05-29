import {Injectable} from '@angular/core';
// @ts-ignore
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {AuthService} from './auth.service';
import {IMessageSocket} from '../interfaces/chat';
import {ToastMessageService} from './toast-message.service';
import {BehaviorSubject} from 'rxjs';
import {AudioPlayerService} from './audio-player.service';


@Injectable({
  providedIn: 'root'
})
export class HandleWebSocketConnectionService {

  private stompClient: any;
  public refetchChats = new BehaviorSubject<{ userEmail: string, randomUUID: string, userId: string } | null>(null);

  constructor(private authService: AuthService,
              private toastService: ToastMessageService,
              private audioPlayerService: AudioPlayerService
  ) {
  }


  public $getRefetchChats() {
    return this.refetchChats.asObservable();
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
      // Estrai il contenuto del messaggio dal body dal socket
      // se questo messaggio è presente allora riaggiorno la chat dei messaggi
      const messageContent: IMessageSocket = JSON.parse(message.body);
      console.log(messageContent, "MESSAGE CONTENTTTTTT")
      if (messageContent) {
        if (messageContent.email !== this.authService.getEmail()) {
          this.toastService.show("info",
            "notifica",
            "Hai ricevuto un messaggio da " + messageContent?.userSender + " - " + messageContent.content,
            10000
          );
          this.audioPlayerService.startNewAudio("/assets/fart4.mp3")
        }
        this.refetchChats.next({randomUUID: crypto.randomUUID(), userEmail: messageContent.email, userId: ""})
      }
    })
  }

  public isAlreadyConnected(): boolean {
    return this.stompClient && this.stompClient.connected
  }

}
