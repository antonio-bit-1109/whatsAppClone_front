import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityMethodService {

  constructor() {
  }

  public firstLetterUpperCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
