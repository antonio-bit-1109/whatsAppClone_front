import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/auth"

  constructor(private http: HttpClient) {
  }

  public login(data: ILogin) {

    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.post(`${this.url}/login`, data, {headers})
  }
}
