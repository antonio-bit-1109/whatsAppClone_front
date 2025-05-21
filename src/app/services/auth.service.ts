import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin, IRegister, ITokenStructure} from '../interfaces/auth';
import {jwtDecode} from "jwt-decode";
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ISuccessResponse} from '../interfaces/SuccessResponse';
import {ToastMessageService} from './toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/auth"

  constructor(private http: HttpClient,
              private router: Router,
              private toastMessage: ToastMessageService) {
  }

  // login standard sull app nel quale viene fornito token Jwt standard
  public login(data: ILogin): Observable<ISuccessResponse> {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.post<ISuccessResponse>(`${this.url}/login`, data, {headers})
  }

  public register(data: IRegister): Observable<ISuccessResponse> {
    const headers = {
      'Content-Type': 'application/json',
    }
    return this.http.post<ISuccessResponse>(`${this.url}/register`, data, {headers})
  }

  public saveToken(token: string) {
    token && localStorage.setItem("token", token);
  }

  public getToken() {
    return localStorage.getItem("token") ? localStorage.getItem("token") : null;
  }

  public getProfileImage() {
    if (this.getToken() !== null) {
      const decoded: ITokenStructure = jwtDecode(this.getToken() as string);
      return decoded.image;
    }
    return "";
  }

  public getFullName() {
    if (this.getToken() !== null) {
      const decoded: ITokenStructure = jwtDecode(this.getToken() as string);
      return decoded.full_name;
    }
    return "";
  }

  public getRole() {
    if (this.getToken() !== null) {
      const decoded: ITokenStructure = jwtDecode(this.getToken() as string);
      return decoded.role;
    }
    return null;
  }

  public getUserId() {
    if (this.getToken() !== null) {
      const decoded: ITokenStructure = jwtDecode(this.getToken() as string);
      return decoded.id;
    }
    return null;
  }

  public getUsername() {
    if (this.getToken() !== null) {
      const decoded: ITokenStructure = jwtDecode(this.getToken() as string);
      return decoded.sub;
    }
    return null;
  }

  // Login con Google
  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  public logout() {
    if (this.getToken() !== null) {
      localStorage.removeItem("token")
      void this.router.navigateByUrl("/login")
      this.toastMessage.show("success", "Logout", "hai effettuato il logout")
    }
  }

}
