import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin, IRegister, ITokenStructure} from '../interfaces/auth';
import {jwtDecode} from "jwt-decode";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/auth"

  constructor(private http: HttpClient, private router: Router) {
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
    return null;
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
      this.router.navigateByUrl("/login")
    }
  }

}
