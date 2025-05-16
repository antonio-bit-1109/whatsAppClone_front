import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin, IRegister} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/auth"

  constructor(private http: HttpClient) {
  }

  // login standard sull app nel quale viene fornito token Jwt standard
  public login(data: ILogin) {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.post(`${this.url}/login`, data, {headers})
  }

  public register(data: IRegister) {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.post(`${this.url}/register`, data, {headers})
  }

  // Login con Google
  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

}
