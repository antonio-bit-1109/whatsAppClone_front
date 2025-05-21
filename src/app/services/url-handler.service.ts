import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlHandlerService {

  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {

    // faccio una subscribe all oggetto router.events per tenere traccia delle rotte
    // e salvo quella corrente e quella precedente in due variabili accessibili dal servizio
    // infine inietto questo servizio in app component per avviare la subscribe
    // qualora mi servisse sapere quale sia la rotta attuale o precedente
    // accedo ai metodi nel servizio
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.urlAfterRedirects;
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

}
