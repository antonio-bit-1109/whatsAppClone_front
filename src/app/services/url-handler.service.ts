import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {HandleWebSocketConnectionService} from './handle-web-socket-connection.service';
import {ChatService} from './chat.service';
import {AuthService} from './auth.service';
import {take} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlHandlerService {

  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router,
              private webSocketService: HandleWebSocketConnectionService,
              private chatService: ChatService, private authService: AuthService) {

    // faccio una subscribe all oggetto router.events per tenere traccia delle rotte
    // e salvo quella corrente e quella precedente in due variabili accessibili dal servizio
    // infine inietto questo servizio in app component per avviare la subscribe
    // qualora mi servisse sapere quale sia la rotta attuale o precedente
    // accedo ai metodi nel servizio
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe(async (event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.urlAfterRedirects;

      // quando nel servizio ottengo la current e previous route
      // all interno della subscription (quindi viene aggiornata ogni volta che cambia la rotta)
      // controllo se le rotte combaciano con le mie necessità e se il controllo è positivo stabilisco la connessione al websocket
      await this.checkTheRoute();
      console.log('URL precedente:', this.previousUrl);
      console.log('URL corrente:', this.currentUrl);


    });

  }

  public getCurrentUrl() {
    return this.currentUrl
  }

  public getPreviousUrl() {
    return this.previousUrl
  }


  public async checkTheRoute() {

    if (this.getCurrentUrl() === "/login" ||
      this.getCurrentUrl() === "/register" ||
      this.getCurrentUrl()?.startsWith("/success")) {

      await this.webSocketService.disconnectToServerSocket()

      console.log("rotta inappropriata. nessuna connessione web socket inizializzata.")
      return;
    }

    console.log("rotta appropriata...inizializzo connessione web socket.")
    await this.webSocketService.connectToServerSocket_Promise();
    this.chatService.getAllUserChat(this.authService.getUserId()).pipe(
      take(1)
    ).subscribe({
      next: (resp) => {
        resp && resp.length > 0 &&
        resp.map(chat => this.webSocketService.subscribeToPrivateChat(chat.chatIdentity))
      },
      error: (err: HttpErrorResponse) => {
      }
    })
    return;


  }
}
