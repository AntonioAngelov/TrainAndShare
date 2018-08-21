import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUpModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public readonly appKey = 'kid_Hy3D2b8IX';
  public readonly appSecret = '8111fd984281490381f599db92fa9484';
  public readonly registerUrl = `https://baas.kinvey.com/user/${this.appKey}`;
  public readonly loginUrl = `https://baas.kinvey.com/user/${this.appKey}/login`;
  public readonly logoutUrl = `https://baas.kinvey.com/user/${this.appKey}/_logout`;

  register(body: SignUpModel) {
    return this.http.post(this.registerUrl, JSON.stringify(body));
  }

  login(body: LoginModel) {
    return this.http.post(this.loginUrl, JSON.stringify(body));
  }


  logout(): Observable<Object> {
    return this.http.post<object>(this.logoutUrl, {});
  }

  checkIfLogged() {
    return this.getAuthtoken() !== null;
  }

  getAuthtoken(): string {
    return localStorage.getItem('authToken');
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  clearSession(): void {
    localStorage.clear();
  }

  isAuthenticated() : boolean {
    return localStorage.getItem('authToken') !== null;
  }
}