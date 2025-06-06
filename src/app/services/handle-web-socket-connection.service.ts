import {Injectable} from '@angular/core';
// @ts-ignore
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import {AuthService} from './auth.service';
import {IMessageSocket} from '../interfaces/chat';
import {ToastMessageService} from './toast-message.service';
import {BehaviorSubject} from 'rxjs';
import {AudioPlayerService} from './audio-player.service';
import {costanti} from "../costanti/connections"
import {Router} from '@angular/router';
import {StompSubscription} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class HandleWebSocketConnectionService {

  private stompClient: StompJs.Client | null = null;
  private connectionPromise: Promise<boolean> | null = null;
  public refetchChats = new BehaviorSubject<{ userEmail: string, randomUUID: string, userId: string } | null>(null);
  private activeSubscriptions = new Map<string, StompSubscription>();

  constructor(private authService: AuthService,
              private toastService: ToastMessageService,
              private audioPlayerService: AudioPlayerService,
              private router: Router
  ) {
  }


  public $getRefetchChats() {
    return this.refetchChats.asObservable();
  }


  public connectToServerSocket_Promise(): Promise<boolean> {

    if (this.isAlreadyConnected()) {
      console.log("socket already connected... no action needed")
      return Promise.resolve(true);
    }


    // promise per stabile una connessione stomp tra client e server
    this.connectionPromise = new Promise((resolve, reject) => {

      //controllo che sia presente il token e che venga inviato nella richiesta
      // per poter autenticare il client dentro al server
      const token = this.authService.getToken();

      if (!token) {
        console.error("impossibile reperire token da utilizzare nella promise.")
        reject("impossibile reperire token.")
      }

      // inizializzo i parametri della connessione
      // a chi connettersi, ogni quanto tempo pingare tra client <--> server per confermare che la connessione funziona
      this.stompClient = new StompJs.Client({
        webSocketFactory: () => new SockJS(`${costanti.prefix}://${costanti.host}:${costanti.serverPort}/ws?token=${token}`),
        debug: (msg) => console.debug(msg),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      })


      // avvio il metodo this.stompClient.activate();
      // e a seconda dell esito
      // 1.success
      // 2. errore Stomp
      // 3. errore WebSocket
      // sono presenti tre eventi in grado di catturare quell errore e farci qualcosa
      this.stompClient.onConnect = () => {
        console.log("WebSocket connesso correttamente!");
        resolve(true);
      };

      this.stompClient.onStompError = (frame: any) => {
        console.error("Errore STOMP:", frame);
        this.stompClient = null;
        reject(new Error('Errore nella connessione STOMP'));
      };

      this.stompClient.onWebSocketError = (event: any) => {
        console.error("Errore WebSocket:", event);
        this.stompClient = null;
        reject(new Error('Errore nella connessione WebSocket'));
      };

      this.stompClient.activate();
    })


    return this.connectionPromise;
  }


  public async disconnectToServerSocket() {
    if (this.stompClient && this.stompClient.connected) {
      // fai unsubscribe da tutti i channel acui sei iscritto
      this.activeSubscriptions.forEach(sub => sub.unsubscribe())
      await this.stompClient.deactivate();
      this.stompClient = null;
      this.connectionPromise = null;
      console.log("Disconnessione dal socket server completata");
    }
  }


  public async subscribeToPrivateChat(chatIdentity: string) {
    try {

      if (this.stompClient?.connected) {
        // Attendi che la connessione si completi

        if (this.activeSubscriptions.has(chatIdentity)) {
          console.debug("sottoscrizione gia presente per la chat --> " + chatIdentity)
          console.debug("sottoscrizione non necessaria.")
          return;
        }

        const subscription = this.stompClient.subscribe(`/chat-private/${chatIdentity}`, (message: any) => {
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
                10000,
                "interactiveToast",
                {
                  url: "/home/chats-main",
                  chatIdentity: chatIdentity,
                  email: this.authService.getEmail() as string
                }
              );
              this.audioPlayerService.startNewAudio("/assets/fart4.mp3")
            }

            this.undestandingWhoIsFetching(messageContent)
          }
        })

        // aggiungo la subscription alla mappa
        this.activeSubscriptions.set(`${chatIdentity}`, subscription);

      } else {
        void this.router.navigateByUrl("/home")
      }
    } catch (e) {
      console.error("Errore durante la sottoscrizione al canale:", e);

    }


  }


  // in questo metodo voglio capire chi sta effettuando la fetch per ricaricare la chat.
  // nella logica di base, in una chat tra due persone , l utente che effettua la richiesta al sever con la propria email o il proprio id riceve in risposta un oggetto contenente
  // l'altra persona che sta partecipando alla chat, INSIEME  a tutti i messaggi presenti nella chat stessa,
// QUINDI MARCELLO INVIA IL MESSAGGIO --> MARCELLO RICEVE TRAMITE WEB SOCKET CHE LA CHAT è STATA AGGIORNATA CON UN MESSAGGIO , EFFETTUA FETCH SUL SERVER PASSANDO I DATI (ID O EMAIL) DI SE STESSO
  // COSI CHE OGGETTO DI RITORNO ABBIA I DATI DELL ALTRO UTENTE CHE PARTECIPA ALLA CHAT E SIA MOSTRATO NELL UI
  public undestandingWhoIsFetching(messageContent: IMessageSocket) {
    if (messageContent.email !== this.authService.getEmail()) {
      this.refetchChats.next(
        {
          randomUUID: crypto.randomUUID(),
          userEmail: this.authService.getEmail() as string,
          userId: ""
        }
      )

    } else {
      this.refetchChats.next(
        {
          randomUUID: crypto.randomUUID(),
          userEmail: messageContent.email,
          userId: ""
        }
      )
    }
  }

  public isAlreadyConnected(): boolean {
    return this.stompClient !== null &&
      this.stompClient.connected
  }


}
